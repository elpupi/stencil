
import { ModuleServices, ModulesServicesConfig, ModuleServicesConfig, ModulesServices } from '@upradata/browser-util';
import { LoadingAnimationPopupOptions, LoadingAnimationPopup } from './loading-animation-popup.service';
import { LanguageService, LanguageServiceOptions } from './language.service';
import { Popup, PopupOptions } from './popup.service';
import { Service } from '../service';


export type MtModuleServices = ModuleServices<Service, {
    popup: Popup;
    loadingAnimationPopup: LoadingAnimationPopup;
    language: LanguageService;
}>;


export class MtModuleServicesOpts {
    popup: PopupOptions;
    loadingAnimationPopup: Partial<LoadingAnimationPopupOptions>;
    language: LanguageServiceOptions;
}


export type MtModulesServices = ModulesServices<MtModuleServices, 'tilda'>;


export class MtModulesServicesConfig extends ModulesServicesConfig<MtModulesServices, Service>{
    modulesServices: {
        tilda: ModuleServicesConfig<MtModuleServices, MtModuleServicesOpts>;
    };
}
