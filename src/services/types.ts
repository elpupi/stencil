import { ModuleResponsiveServices, ModuleResponsiveServicesConfig } from '../responsive/types';
import { ModulesServicesOpts, ModuleServicesConfig, ModulesServices } from '@upradata/browser-util';
import { Service } from './service';

export type MtModulesServices = ModulesServices<Service> & {
    responsive: ModuleResponsiveServices;
};


export type MtModulesServicesOpts = ModulesServicesOpts<MtModulesServices, Service> & {
    modulesServices: {
        responsive: ModuleServicesConfig<ModuleResponsiveServices, ModuleResponsiveServicesConfig>;
    };
};
