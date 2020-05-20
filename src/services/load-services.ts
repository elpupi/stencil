import { EVENTS } from '../util/custom-events';
import { ReplaySubject } from 'rxjs';
import { LoadServices, MtServices, MtServicesConfig, Service, LoadServicesModule } from './types';
import { entries, ObjectOf, assignRecursive, AssignOptions } from '@upradata/util';
import { dispatchCustomEvent } from '@upradata/browser-util';

export let services: MtServices = {} as any;
const loaded$ = new ReplaySubject<void>(1);

export const loadServices: LoadServices<MtServicesConfig, MtServices> = async servicesConfig => {

    const { globalVariable, include, exclude, dispatchEvents } = assignRecursive(new MtServicesConfig(), servicesConfig, new AssignOptions({ arrayMode: 'replace' }));

    const loadedPromises: Promise<{ name: string; services: ObjectOf<Service>; }>[] = [];

    const addService = async (name: string, config: any, module$: Promise<LoadServicesModule<any, ObjectOf<Service>>>) => {
        const loaded = module$.then(m => m.loadServices(config)).then(services => ({ name, services }));
        loadedPromises.push(loaded);
    };

    for (const [ name, config ] of entries(servicesConfig.services)) {
        if (exclude && exclude[ name ])
            continue;

        if (!include || include[ name ]) {

            switch (name) {
                case 'responsive':
                    addService(name, config, import('../responsive/services')); break;
                default:
                    console.warn(`Unknown service ${name}!`);
            }

        }
    }

    const servicesLoaded = await Promise.all(loadedPromises);

    for (const { name, services: s } of servicesLoaded) {
        services[ name ] = s;
        dispatchCustomEvent(EVENTS.SERVICE_LOADED(name));
    }


    if (globalVariable) {
        const global = window[ globalVariable ] = window[ globalVariable ] || {} as any;
        global.services = {} as any;

        for (const [ k, v ] of Object.entries(services))
            global.services[ k ] = v;
    }


    if (dispatchEvents)
        dispatchCustomEvent(EVENTS.SERVICES_LOADED);

    loaded$.next();
    return services;
};




export const services$ = new Promise<MtServices>((res, _rej) => {
    window.addEventListener(EVENTS.SERVICES_LOADED, () => {
        res(services);
    }, { once: true, passive: true });
});


export const servicesObs$ = loaded$.asObservable();
