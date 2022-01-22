import { ModulesServicesOptions, ModulesServices, ModulesServicesConfig } from '@upradata/browser-util';
import { TildaModuleServices, TildaModuleServicesOpts } from './tilda';
import { ResponsiveModuleServices, ResponsiveModuleServicesOpts } from '../responsive/types';


export type MtModulesServices = ModulesServices<{
    responsive: ResponsiveModuleServices;
    tilda: TildaModuleServices;
}>;


export type MtModulesServicesOptions = ModulesServicesOptions<MtModulesServices, {
    responsive: ResponsiveModuleServicesOpts;
    tilda: TildaModuleServicesOpts;
}>;

export type MtModulesServicesConfig = ModulesServicesConfig<MtModulesServices, MtModulesServicesOptions>;
