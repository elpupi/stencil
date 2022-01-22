import { MediaQuery } from './media-query.service';
import { AddResponsiveClasses } from './add-responsive-classes.service';
import { ResponsiveProp } from './responsive-prop.service';
import { LAYOUT_BREAKPOINTS } from './responsive-breakpoints';
import { BreakpointObserver } from './breakpoint-observer.service';
import { BreakPoint } from './breakpoints';
import { ModuleServices } from '@upradata/browser-util';
import { Service } from '../services/service';

export interface ResponsiveModuleServices extends ModuleServices<Service> {
    isMobile: boolean;
    breakpoints: BreakPoint[];
    mediaQuery: MediaQuery;
    breakpointObserver: BreakpointObserver;
    addResponsiveClasses: AddResponsiveClasses;
    responsiveProp: ResponsiveProp;
}


export class ResponsiveModuleServicesOpts {
    breakpoints?: BreakPoint[] = LAYOUT_BREAKPOINTS;
}
