import { LoadServices } from '@upradata/browser-util';
// import { LoadingAnimationPopup } from './loading-animation-popup.service';
// import { LanguageService } from './language.service';
// import { Popup } from './popup.service';
// import { loadScrollHashService } from './scroll-hash.service';
import { loadIsMobileService } from './is-mobile.service';
import { TildaModuleServices, TildaModuleServicesOpts } from './types';


export const loadServices: LoadServices<TildaModuleServicesOpts, TildaModuleServices> = async servicesConfig => {
    loadIsMobileService(); // event base service with nothing to be returned
    // loadScrollHashService(); // event base service with nothing to be returned

    const getPopupServices = async () => {
        if (!servicesConfig.popup) {
            if (servicesConfig.loadingAnimationPopup)
                console.error('Cannot load LoadingAnimationPopup service without the Popup service set up.');

            return {};
        }

        const [ { Popup }, { LoadingAnimationPopup } ] = [ await import('./popup.service'), await import('./loading-animation-popup.service') ];

        const popup = new Popup(servicesConfig.popup);
        const loadingAnimationPopup = new LoadingAnimationPopup(servicesConfig.loadingAnimationPopup, popup);

        return { popup, loadingAnimationPopup };
    };

    const { popup, loadingAnimationPopup } = await getPopupServices();

    return {
        popup,
        loadingAnimationPopup,
        get language() {
            if (servicesConfig.language) {
                return import('./language.service').then(({ LanguageService }) => new LanguageService(servicesConfig.language, loadingAnimationPopup));
            }
        },
        get zeroBlock() {
            if (servicesConfig.zeroBlock)
                return import('./tilda-zero-block.service');
        }
    };
};
