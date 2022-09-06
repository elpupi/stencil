
import type { ModuleServices } from '@upradata/browser-util';
import type { LoadingAnimationPopupOptions, LoadingAnimationPopup } from './loading-animation-popup.service';
import type { LanguageService, LanguageServiceOptions } from './language.service';
import type { Popup, PopupOptions } from './popup.service';
import * as TildaZeroBlockService from './tilda-zero-block.service';
import type { Service } from '../service';


export type TildaModuleServices = ModuleServices<Service, {
    popup: Popup;
    loadingAnimationPopup: LoadingAnimationPopup;
    language: LanguageService;
    zeroBlock: typeof TildaZeroBlockService;
}>;


export interface TildaModuleServicesOpts {
    popup?: PopupOptions;
    loadingAnimationPopup?: Partial<LoadingAnimationPopupOptions>;
    language?: LanguageServiceOptions;
    zeroBlock?: boolean;
}
