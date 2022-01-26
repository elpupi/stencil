import { Term } from '@upradata/tilda-tools/lib-esm/src/terms/terms.types';
import { Api } from '../api';
import { servicesLoaded } from '../service';
import { LoadingAnimationPopupOptions, onLoad } from '../tilda';


export interface TermsBaseOptions {
    api: Api;
    loadingAnimation?: Partial<LoadingAnimationPopupOptions>;
    htmlCodeId?: string;
}


type TermsBaseOpts = TermsBaseOptions & { name: string; };


export abstract class TermsBase {
    public api: Api;
    public htmlCodeId: string;
    protected loadingAnimationOptions: LoadingAnimationPopupOptions;

    constructor(options: TermsBaseOpts) {
        this.api = new Api(options.api);
        this.htmlCodeId = options.htmlCodeId;

        this.loadingAnimationOptions = Object.assign({
            loadingMessage: `Loading "${options.name}". Be patient while the network is responding`,
            errorMessage: `An error occured. We could not load "${options.name}".`,
            autoShow: true,
            autoClose: true
        }, options.loadingAnimation);
    }

    protected init() {
        onLoad(() => servicesLoaded().then(() => this.doInit()));
    }


    protected apiUrl(pathUrl: string = '') {
        const { api } = this;
        const isLocal = [ '192.168.0', '127.0.0.1', 'localhost', 'treasure' ].some(prefix => location.href.includes(prefix));
        const url = isLocal ? `http://localhost:${api.devPort}/${api.url}` : `${this.api.domain}/${this.api.url}`;

        return `${url}${pathUrl}`;
    }

    protected ajaxSettings(settings?: JQuery.AjaxSettings) {
        return {
            crossDomain: true,
            cache: false,
            method: 'GET',
            dataType: 'json',
            // strangely, Jquery it is not working if we pass this.onSucces.bind(this)
            success: (...args) => this.onSuccess(...args),
            error: (...args) => this.onError(...args),
            ...settings
        } as JQuery.AjaxSettings;
    }

    protected abstract doInit(): void | Promise<void>;

    protected sendAjaxRequest(ajaxSettings: JQuery.AjaxSettings) {
        servicesLoaded().then(s => s.tilda.loadingAnimationPopup.startLoadingAnimation({ ...this.loadingAnimationOptions, delay: 500 }));
        $.ajax(ajaxSettings);
    }

    protected onError(_jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: string) {
        servicesLoaded().then(s => s.tilda.loadingAnimationPopup.error(this.loadingAnimationOptions.errorMessage));
        console.error('Error occured: ', { textStatus, errorThrown });
    }


    protected abstract onSuccess(term: Term, textStatus: JQuery.Ajax.SuccessTextStatus, jqXHR: JQuery.jqXHR): void | Promise<void>;

    protected stopLoadingAnimation() {
        servicesLoaded().then(s => {
            s.tilda.loadingAnimationPopup.stopLoadingAnimation({ autoClose: this.loadingAnimationOptions.autoClose });
        });
    }

    protected error() {
        servicesLoaded().then(s => {
            s.tilda.loadingAnimationPopup.error(this.loadingAnimationOptions.errorMessage);
        });
    }
}
