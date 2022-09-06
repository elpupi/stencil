import { Component, Host, h, Prop, Watch, State, Method } from '@stencil/core';
import { loadServices } from '@upradata/browser-util';
import { BreakPoint, LAYOUT_BREAKPOINTS/* , isMobile, MediaQuery, BreakpointObserver, AddResponsiveClasses, ResponsiveProp */ } from '../../responsive';
import { MtModulesServices, MtModulesServicesConfig, MtModulesServicesOpts, servicesLoaded, TermsModuleServicesOpts, TildaModuleServicesOpts } from '../../services';
import { EVENTS } from '../../util/custom-events';
import { BooleanAttribute, toBoolean, toObject } from '../../util';

// import { MTServices } from './mt';

// const isPrimitive = (v: any) => [ 'string', 'boolean', 'number' ].some(type => typeof v === type);

@Component({
    tag: 'mt-services',
    shadow: true,
})
export class MtServices {
    static isLoaded: boolean = false;

    @Prop({ attribute: 'breakpoints' }) breakpoints: BreakPoint[] | string = LAYOUT_BREAKPOINTS;
    @Prop({ attribute: 'tilda-options' }) tildaServicesOptions: TildaModuleServicesOpts | string;
    @Prop({ attribute: 'terms-options' }) termsServicesOptions: TermsModuleServicesOpts | string;
    @Prop() responsive: BooleanAttribute = true;
    @Prop() tilda: BooleanAttribute = true;
    @Prop() terms: BooleanAttribute = true;
    @Prop() disabled: BooleanAttribute = false;
    @State() isLoaded: boolean = false;


    get servicesOptions(): MtModulesServicesOpts {
        return {
            tilda: toObject(this.tildaServicesOptions),
            terms: toObject(this.termsServicesOptions),
            responsive: { breakpoints: toObject(this.breakpoints) }
        };
    }


    @Watch('disabled')
    watchDisabled(newValue: BooleanAttribute) {
        if (!toBoolean(newValue))
            this.initServices(this.servicesOptions);
    }


    @Method()
    async services() {
        return servicesLoaded();
    }


    @Method()
    async setServicesOptions(options: MtModulesServicesOpts) {
        if (options.responsive.breakpoints)
            this.breakpoints = options.responsive.breakpoints;

        if (options.tilda)
            this.tildaServicesOptions = options.tilda;
    }

    componentWillLoad() {
        if (!toBoolean(this.disabled))
            this.initServices(this.servicesOptions);
    }


    @Method()
    async initServices(options: MtModulesServicesOpts): Promise<MtModulesServices> {

        if (MtServices.isLoaded)
            return;

        MtServices.isLoaded = true;

        // import('../../services/load-services').then(({ loadServices }) => {

        const config: MtModulesServicesConfig = {
            config: {
                responsive: {
                    lazyModule: () => import('../../responsive/responsive-services.module'),
                    config: options.responsive
                },
                tilda: {
                    lazyModule: () => import('../../services/tilda/tilda-services.module'),
                    config: options.tilda
                },
                terms: {
                    lazyModule: () => import('../../services/terms/terms-services.module'),
                    config: options.terms
                }
            },
            windowGlobal: 'mt',
            include: { responsive: toBoolean(this.responsive), tilda: toBoolean(this.tilda), terms: toBoolean(this.terms) },
            exclude: undefined,
            dispatchEvents: true,
            servicesLoadedEventName: EVENTS.SERVICES_LOADED,
            serviceLoadedEventName: EVENTS.SERVICE_LOADED
        };

        loadServices(config);

        const services = await servicesLoaded();
        this.isLoaded = true;

        return services;
        // });
    }

    /* componentWillRender() {
        // A promise can be returned, that can be used to wait for the upcoming render.
        return this.initServices(this._servicesOptions);
    } */

    render() {
        return (
            <Host>
                {this.isLoaded && <slot></slot>}
            </Host>
        );
    }

}
