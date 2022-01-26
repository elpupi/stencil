import type { Term } from '@upradata/tilda-tools/lib-esm/src/terms/terms.types';
import { servicesLoaded } from '../../services';
import { buildTerm } from './build-term';
import { TermsBase, TermsBaseOptions } from './terms.base';


export type PolicyShortOptions = TermsBaseOptions & { popupLinkId: string; };

export class PolicyShort extends TermsBase {
    private mtTildaTermEl: HTMLMtTildaTermElement = undefined;
    public popupLinkId: string;

    constructor(options: PolicyShortOptions) {
        super({ ...options, loadingAnimation: { autoClose: false }, name: 'Privacy Policy' });
        this.popupLinkId = options.popupLinkId;
        this.init();
    }

    protected doInit() {

        const linkToPopup = document.querySelector(`[href="${this.popupLinkId}"]`);

        if (!linkToPopup) {
            console.error(`Cannot find the <a> link to open the short policy popup '[href="${this.popupLinkId}"]'`);
            return;
        }

        linkToPopup.addEventListener('click', async e => {
            e.preventDefault();

            const { tilda } = await servicesLoaded();

            if (!this.mtTildaTermEl) {
                this.sendAjaxRequest(this.ajaxSettings({ url: this.apiUrl() }));
            } else {
                // every time the popup is closed, mtTildaTermEl is removed from the popup content
                // so it is detached and we have to re-init it (init is calling tilda t688_init)
                tilda.popup.append(this.mtTildaTermEl);
                this.mtTildaTermEl.init(true);
            }

            tilda.popup.show();
        });
    }

    protected async onSuccess(term: Term, _textStatus: JQuery.Ajax.SuccessTextStatus, _jqXHR: JQuery.jqXHR) {
        const services = await servicesLoaded();

        try {
            const { termElement, init } = buildTerm(term);

            this.mtTildaTermEl = termElement;
            this.mtTildaTermEl.classList.add('mt-short-policy-loaded');

            services.tilda.popup.clear();
            services.tilda.popup.append(this.mtTildaTermEl);
            await init({ isPopup: true, noHeader: true }).then(() => termElement.init());

        } catch (e) {
            this.error();
            console.error(e);
        }

        this.stopLoadingAnimation();
    }
}
