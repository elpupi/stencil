import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { BreakPoint, LAYOUT_BREAKPOINTS/* , isMobile, MediaQuery, BreakpointObserver, AddResponsiveClasses, ResponsiveProp */ } from '../../responsive';
import { MtServicesConfig } from '../../services';
import { EVENTS } from '../../util/custom-events';

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



    @Watch('breakpoints')
    watchBreakpoints(newValue: BreakPoint[] | string) {
        this.breakpoints = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    }

    componentWillLoad() {
        this.watchBreakpoints(this.breakpoints);
        import('../../services/load-services').then(({ loadServices }) => {
            const config: MtServicesConfig = {
                services: {
                    responsive: {
                        loadServicesModule: import('../../responsive/services'),
                        config: { breakpoints: this.breakpoints }
                    }
                },
                windowGlobal: 'mt',
                include: undefined,
                exclude: undefined,
                dispatchEvents: true,
                servicesLoadedEventName: EVENTS.SERVICES_LOADED,
                serviceLoadedEventName: EVENTS.SERVICE_LOADED
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
