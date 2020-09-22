import { isMobile as isMobileService } from './is-mobile.service';
import { ModuleResponsiveServices, ModuleResponsiveServicesConfig } from './types';
import { BreakpointObserver } from './breakpoint-observer.service';
import { MediaQuery } from './media-query.service';
import { AddResponsiveClasses } from './add-responsive-classes.service';
import { ResponsiveProp } from './responsive-prop.service';
import { Service } from '../services/service';
import { assignRecursive } from '@upradata/util';
import { LoadServices } from '@upradata/browser-util';


export const loadServices: LoadServices<ModuleResponsiveServicesConfig, ModuleResponsiveServices, Service> = async servicesConfig => {
    const config = assignRecursive(new ModuleResponsiveServicesConfig(), servicesConfig);

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
