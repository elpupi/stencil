import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { BreakPoint, LAYOUT_BREAKPOINTS/* , isMobile, MediaQuery, BreakpointObserver, AddResponsiveClasses, ResponsiveProp */ } from '../../responsive';
// import { MTServices } from './mt';

// const isPrimitive = (v: any) => [ 'string', 'boolean', 'number' ].some(type => typeof v === type);

@Component({
    tag: 'mt-services',
    shadow: true,
})
export class MtServices {
    /*   @Prop() isMobile: boolean = true;
      @Prop() mediaQuery: boolean = true;
      @Prop() breakpointObserver: boolean = true;
      @Prop() responsiveClasses: boolean = true;
      @Prop() responsiveProps: boolean = true; */
    @Prop({ attribute: 'breakpoints' }) breakpoints: BreakPoint[] = LAYOUT_BREAKPOINTS;


    /* @Watch('isMobile')
    @Watch('breakpoints')
    @Watch('mediaQuery')
    @Watch('breakpointObserver')
    @Watch('responsiveClasses')
    @Watch('responsiveProps')
    watchBreakpoints(newValue: any, oldValue: any, propName: keyof MtServices) {
        this[ propName ] = typeof oldValue === 'object' && typeof newValue !== 'object' ? JSON.parse(newValue) : newValue;
         if (newValue)
             this.enableService(propName);
    } */

    @Watch('breakpoints')
    watchBreakpoints(newValue: BreakPoint[] | string) {
        this.breakpoints = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    }

    componentWillLoad() {
        this.watchBreakpoints(this.breakpoints);
        import('../../util/services').then(({ loadServices }) => loadServices({ breakpoints: this.breakpoints }));
    }

    /* 
        mt: MTServices;
    
        constructor() {
            this.mt = window.mt = window.mt || {} as any;
            this.mt.services = {} as any;
        } */

    // configuration

    /* enableService(propName: keyof MtServices) {
        const { services } = this.mt;

        switch (propName) {
            case 'isMobile':
                this.mt.isMobile = isMobile();
                break;
            case 'mediaQuery':
                if (!this.mt.MediaQuery) {
                    this.mt.MediaQuery = MediaQuery;

                    if (!services.breakpointObserver)
                        this.watchBreakpoints(this.breakpointObserver, true, 'breakpointObserver');

                    if (!this.mt.breakpoints)
                        this.watchBreakpoints(this.breakpoints, this.breakpoints, 'breakpoints');

                    this.mt.services.mediaQuery = new MediaQuery(services.breakpointObserver, this.mt.breakpoints);
                }

                break;
            case 'breakpointObserver':
                if (!this.mt.BreakpointObserver) {
                    this.mt.BreakpointObserver = BreakpointObserver;
                    services.breakpointObserver = new BreakpointObserver();
                }

                break;
            case 'responsiveClasses':
                if (!this.mt.AddResponsiveClasses) {
                    this.mt.AddResponsiveClasses = AddResponsiveClasses;

                    if (!this.mt.isMobile)
                        this.watchBreakpoints(this.isMobile, true, 'isMobile');

                    if (!this.mt.MediaQuery)
                        this.watchBreakpoints(this.mediaQuery, true, 'mediaQuery');


                    services.addResponsiveClasses = new AddResponsiveClasses({ isMobile: this.mt.isMobile, mediaQuery: services.mediaQuery, }, document.body);
                }

                break;
            case 'responsiveProps':
                if (!this.mt.ResponsiveProp) {
                    this.mt.ResponsiveProp = ResponsiveProp;

                    if (!this.mt.MediaQuery)
                        this.watchBreakpoints(this.mediaQuery, true, 'mediaQuery');

                    services.responsiveProp = new ResponsiveProp(services.mediaQuery);
                }

                break;
            case 'breakpoints':
                if (!this.mt.breakpoints) {
                    this.mt.breakpoints = this.breakpoints;
                }
                break;
        }
    } */

    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }

}
