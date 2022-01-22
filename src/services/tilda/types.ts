
import { ModuleServices } from '@upradata/browser-util';
import { LoadingAnimationPopupOptions, LoadingAnimationPopup } from './loading-animation-popup.service';
import { LanguageService, LanguageServiceOptions } from './language.service';
import { Popup, PopupOptions } from './popup.service';
import { Service } from '../service';


export type TildaModuleServices = ModuleServices<Service, {
    popup: Popup;
    loadingAnimationPopup: LoadingAnimationPopup;
    language: LanguageService;
}>;


export interface TildaModuleServicesOpts {
    popup: PopupOptions;
    loadingAnimationPopup: Partial<LoadingAnimationPopupOptions>;
    language: LanguageServiceOptions;
}
