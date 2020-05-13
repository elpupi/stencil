import { isMobile as isMobileService, BreakPoint, LAYOUT_BREAKPOINTS, MediaQuery, BreakpointObserver, AddResponsiveClasses, ResponsiveProp } from '../responsive';
import { assignRecursive, AssignOptions } from '@upradata/util';
import { EVENTS, dispatchCustomEvent } from './custom-events';
import { ReplaySubject } from 'rxjs';

export class MT {
    isMobile: boolean = undefined;
    breakpoints: BreakPoint[] = undefined;
    mediaQuery: MediaQuery = undefined;
    breakpointObserver: BreakpointObserver = undefined;
    addResponsiveClasses: AddResponsiveClasses = undefined;
    responsiveProp: ResponsiveProp = undefined;
}


export class ServiceConfig {
    breakpoints: BreakPoint[] = LAYOUT_BREAKPOINTS;
    globalVariable: string = 'mt';
    include: Partial<Record<keyof MT, boolean>>;
    exclude: Partial<Record<keyof MT, boolean>>;
    dispatchEvents: boolean = true;
}



export let services: MT;
const loaded$ = new ReplaySubject<void>(1);

export const loadServices = (configuration: Partial<ServiceConfig>) => {
    const config = assignRecursive(new ServiceConfig(), configuration, new AssignOptions({ arrayMode: 'replace' }));

    const { globalVariable, include, exclude, dispatchEvents } = config;
    services = {} as any;

    const isMobile = () => isMobileService();
    const breakpoints = () => config.breakpoints;
    const breakpointObserver = () => new BreakpointObserver();
    const mediaQuery = () => new MediaQuery(breakpointObserver(), breakpoints());

    const servicesFactory = {
        isMobile,
        breakpoints,
        breakpointObserver,
        mediaQuery,
        addResponsiveClasses: () => new AddResponsiveClasses({ isMobile: isMobile(), mediaQuery: mediaQuery() }, document.body),
        responsiveProp: () => new ResponsiveProp(mediaQuery())
    };

    for (const p of Object.keys(new MT())) {
        if (exclude && exclude[ p ])
            continue;

        if (!include || include[ p ])
            services[ p ] = servicesFactory[ p ]();
    }


    if (globalVariable) {
        const globalServices = window[ globalVariable ] = window[ globalVariable ] || {} as any;

        for (const [ k, v ] of Object.entries(services))
            globalServices[ k ] = v;
    }


    if (dispatchEvents)
        dispatchCustomEvent(EVENTS.SERVICE_LOADED);

    loaded$.next();
    return services;
};




export const services$ = new Promise<MT>((res, _rej) => {
    window.addEventListener(EVENTS.SERVICE_LOADED, () => {
        res(services);
    }, { once: true, passive: true });
});


export const servicesObs$ = loaded$.asObservable();
