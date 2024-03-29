import { isMobile as isMobileService } from './is-mobile.service';
import { ResponsiveModuleServices, ResponsiveModuleServicesOpts } from './types';
import { BreakpointObserver } from './breakpoint-observer.service';
import { MediaQuery } from './media-query.service';
import { AddResponsiveClasses } from './add-responsive-classes.service';
import { ResponsiveProp } from './responsive-prop.service';
import { assignRecursive } from '@upradata/util';
import { LoadServices } from '@upradata/browser-util';


export const loadServices: LoadServices<ResponsiveModuleServicesOpts, ResponsiveModuleServices> = async servicesConfig => {
    const config = assignRecursive(new ResponsiveModuleServicesOpts(), servicesConfig);

    const isMobile = isMobileService();
    const breakpoints = config.breakpoints;
    const breakpointObserver = new BreakpointObserver();
    const mediaQuery = new MediaQuery(breakpointObserver, breakpoints);

    const services = {
        isMobile,
        breakpoints,
        breakpointObserver,
        mediaQuery,
        addResponsiveClasses: new AddResponsiveClasses({ isMobile, mediaQuery }, document.body),
        responsiveProp: new ResponsiveProp(mediaQuery)
    };

    return services;
};
