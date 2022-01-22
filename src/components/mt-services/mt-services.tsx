import { Component, Host, h, Prop, Watch, State, Method } from '@stencil/core';
import { loadServices, servicesLoaded$ } from '@upradata/browser-util';
import { BreakPoint, LAYOUT_BREAKPOINTS/* , isMobile, MediaQuery, BreakpointObserver, AddResponsiveClasses, ResponsiveProp */ } from '../../responsive';
import { MtModulesServicesConfig } from '../../services';
import { EVENTS } from '../../util/custom-events';
import { TildaModuleServicesOpts } from '../../services/tilda/types';

// import { MTServices } from './mt';

// const isPrimitive = (v: any) => [ 'string', 'boolean', 'number' ].some(type => typeof v === type);

@Component({
    tag: 'mt-services',
    shadow: true,
})
export class MtServices {
    static isLoaded: boolean = false;

    private _breakpoints: BreakPoint[] = LAYOUT_BREAKPOINTS;
    @Prop({ attribute: 'breakpoints' }) breakpoints: BreakPoint[] | string;
    private _tildaServicesOptions: TildaModuleServicesOpts;
    @Prop({ attribute: 'tilda-options' }) tildaServicesOptions: TildaModuleServicesOpts | string;
    @Prop() responsive: boolean = true;
    @Prop() tilda: boolean = true;


    @Watch('breakpoints')
    watchBreakpoints(newValue: BreakPoint[] | string) {
        if (newValue)
            this._breakpoints = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    }


    @Watch('tildaServicesOptions')
    watchTildaServicesOptions(newValue: TildaModuleServicesOpts | string) {
        if (newValue)
            this._tildaServicesOptions = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    }


    @State() isLoaded: boolean = false;


    @Method()
    async services() {
        return servicesLoaded$();
    }

    componentWillLoad() {

        if (MtServices.isLoaded)
            return;

        MtServices.isLoaded = true;

        this.watchBreakpoints(this.breakpoints);
        this.watchTildaServicesOptions(this.tildaServicesOptions);

        // import('../../services/load-services').then(({ loadServices }) => {

        const config: MtModulesServicesConfig = {
            config: {
                responsive: {
                    module: import('../../responsive/responsive-services.module'),
                    config: { breakpoints: this._breakpoints }
                },
                tilda: {
                    module: import('../../services/tilda/tilda-services.module'),
                    config: this._tildaServicesOptions
                }
            },
            windowGlobal: 'mt',
            include: { responsive: this.responsive, tilda: this.tilda },
            exclude: undefined,
            dispatchEvents: true,
            servicesLoadedEventName: EVENTS.SERVICES_LOADED,
            serviceLoadedEventName: EVENTS.SERVICE_LOADED
        };

        loadServices(config);

        servicesLoaded$().then(() => this.isLoaded = true);
        // });
    }

    render() {
        return (
            <Host>
                {this.isLoaded && <slot></slot>}
            </Host>
        );
    }

}
