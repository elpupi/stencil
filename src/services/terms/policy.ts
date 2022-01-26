import type { Term } from '@upradata/tilda-tools/lib-esm/src/terms/terms.types';
import { buildTerm } from './build-term';
import { TermsBase, TermsBaseOptions } from './terms.base';

export type PolicyOptions = TermsBaseOptions & { htmlCodeId: string; };

export class Policy extends TermsBase {
    constructor(options: PolicyOptions) {
        super({ ...options, name: 'Privacy Policy' });
        this.init();
    }

    protected doInit() {
        this.sendAjaxRequest(this.ajaxSettings({ url: this.apiUrl() }));
    }

    protected async onSuccess(term: Term, _textStatus: JQuery.Ajax.SuccessTextStatus, _jqXHR: JQuery.jqXHR) {
        try {
            const { termElement, init } = buildTerm(term);
            const htmlEl = document.querySelector(this.htmlCodeId);

            htmlEl.innerHTML = '';
            htmlEl.appendChild(termElement);
            await init();
        } catch (e) {
            this.error();
            console.error(e);
        }

        this.stopLoadingAnimation();
    }
}
