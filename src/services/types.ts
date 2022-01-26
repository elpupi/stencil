import { ModulesServicesConfOptions, ModulesServices, ModulesServicesConfig } from '@upradata/browser-util';
import { TildaModuleServices, TildaModuleServicesOpts } from './tilda';
import { ResponsiveModuleServices, ResponsiveModuleServicesOpts } from '../responsive/types';
import { TermsModuleServices, TermsModuleServicesOpts } from '.';


export type MtModulesServices = ModulesServices<{
    responsive: ResponsiveModuleServices;
    tilda: TildaModuleServices;
    terms: TermsModuleServices;
}>;


export type MtModulesServicesOpts = {
    responsive?: ResponsiveModuleServicesOpts;
    tilda: TildaModuleServicesOpts;
    terms: TermsModuleServicesOpts;
};

export type MtModulesServicesConfigOptions = ModulesServicesConfOptions<MtModulesServices, MtModulesServicesOpts>;

export type MtModulesServicesConfig = ModulesServicesConfig<MtModulesServices, MtModulesServicesConfigOptions>;
