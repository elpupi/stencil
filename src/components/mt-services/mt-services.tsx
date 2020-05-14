import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { BreakPoint, LAYOUT_BREAKPOINTS/* , isMobile, MediaQuery, BreakpointObserver, AddResponsiveClasses, ResponsiveProp */ } from '../../responsive';
import { MtServicesConfig } from '../../services';
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
    @Prop() responsive: boolean = true;

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
        import('../../services/load-services').then(({ loadServices }) => {
            const config: Partial<MtServicesConfig> = {
                services: {
                    responsive: { breakpoints: this.breakpoints }
                },
                include: {
                    responsive: this.responsive
                }
            };

            loadServices(config);
        });
    }


    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }

}
