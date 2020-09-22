import { ModuleResponsiveServices, ModuleResponsiveServicesConfig } from '../responsive/types';
import { ModulesServicesConfig, ModuleServicesConfig, ModulesServices } from '@upradata/browser-util';
import { Service } from './service';

export interface MtModulesServices extends ModulesServices<Service> {
    responsive: ModuleResponsiveServices;
}


export class MtModulesServicesConfig extends ModulesServicesConfig<MtModulesServices, Service>{

    modulesServices: {
        responsive: ModuleServicesConfig<ModuleResponsiveServices, ModuleResponsiveServicesConfig>;
    };
}
