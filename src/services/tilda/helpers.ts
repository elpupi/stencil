/* import { EVENTS } from './load-services.event';

export const onAfterServicesLoaded = (func: () => any, options: { waitForPageLoad?: boolean; } = {}) => {
    const { waitForPageLoad } = options;
    const isReady = () => waitForPageLoad ? document.readyState === 'complete' : true;


    let isInit = false;

    const init = () => {
        if (!isInit && mt.loaded && isReady()) {
            isInit = true;
            func();
            return true;
        }

        return false;
    };

    if (!init()) {
        window.addEventListener('load', init);
        window.addEventListener(EVENTS.SERVICES_LOADED, init);
    }
}; */


export const onLoad = (func: () => any) => {
    if (document.readyState === 'complete')
        func();
    else
        window.addEventListener('load', func);
};
