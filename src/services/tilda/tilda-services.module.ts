import { LoadServices } from '@upradata/browser-util';
import { LoadingAnimationPopup } from './loading-animation-popup.service';
import { LanguageService } from './language.service';
import { Popup } from './popup.service';
import { loadScrollHashService } from './scroll-hash.service';
import { loadIsMobileService } from './is-mobile.service';
import { TildaModuleServices, TildaModuleServicesOpts } from './types';


export const loadServices: LoadServices<TildaModuleServicesOpts, TildaModuleServices> = servicesConfig => {
    loadIsMobileService(); // event base service with nothing to be returned
    loadScrollHashService(); // event base service with nothing to be returned

    const popup = new Popup(servicesConfig.popup);
    const loadingAnimationPopup = new LoadingAnimationPopup(servicesConfig.loadingAnimationPopup, popup);

    return {
        popup,
        loadingAnimationPopup,
        language: new LanguageService(servicesConfig.language, loadingAnimationPopup)
    };
};
