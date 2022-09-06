import type { TextData } from '@upradata/tilda-tools/lib-esm/src/i18n/text-data/types';
import { NodeTextData, textDataExtra } from '@upradata/tilda-tools/lib-esm/src/i18n/text-data/text-data-extra';
import { UpdateDataReturn, textData } from '@upradata/tilda-tools/lib-esm/src/i18n/text-data/text-data';
import { delayedPromise } from '@upradata/util/lib-esm/promise';
import { LoadingAnimationPopup, LoadingAnimationPopupOptions } from './loading-animation-popup.service';
import { Api } from '../api';
import { onLoad } from './helpers';



const t = textData({ dom: window });
const te = textDataExtra({ dom: window });


const rowToString = (row: TextData) => {
    return `{ rootId: ${row.rootId}, path: ${row.path}, text: ${row.text} }`;
};


type AjaxErrorCallback = (jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: string) => any;
type AjaxSuccessCallback<T> = (data: T, textStatus: JQuery.Ajax.SuccessTextStatus, jqXHR: JQuery.jqXHR) => any;



export class LanguageServiceOptions {
    api: Api;
    includedPages?: string[] = [];
    excludedPages?: string[] = [];
    selector: {
        langLinksDesktop: '[id^="nav"] .t228__right_langs_lang a',
        langLinksMobile: '[id^="nav"] .t282__lang a';
    };
    defaultLanguage: string;
    languages: { lang: string; name: string; }[];
    loadingAnimation?: Partial<LoadingAnimationPopupOptions>;
    activeLinkClass?: string = 'mt-lang-link-active';
    disableLinkClass?: string = 'mt-lang-link-disable';

    // popup: Popup; // = new mt.Popup({ recid: mt.Popup.globalPopupRecId });

    constructor(options: LanguageServiceOptions) {
        Object.assign(this, options);
        this.api = new Api(options.api);
    }
}

type DefaultLangExtraNodes = {
    [ id: string ]: {
        parent: HTMLElement;
        nodeTextDataList: NodeTextData[];
    };
};

export class LanguageService {
    public options: LanguageServiceOptions;
    private langLinksDesktop: NodeListOf<Element>;
    private langLinksMobile: NodeListOf<Element>;
    private langLinks: Element[];
    private domain: string;
    private loadingLang: string;
    private defaultLangExtraRowsById$ = delayedPromise<DefaultLangExtraNodes>();

    constructor(options: LanguageServiceOptions, private loadingAnimationPopup: LoadingAnimationPopup) {
        this.options = new LanguageServiceOptions(options);

        const { api, defaultLanguage, selector } = this.options;

        const isLocal = [ '192.168', '127.0.0.1', 'localhost', 'treasure' ].some(prefix => location.href.includes(prefix));
        this.domain = isLocal ? `http://localhost:${api.devPort}/${api.url}` : `${api.domain}/${api.url}`;

        this.options.defaultLanguage = defaultLanguage || this.langLinks[ 0 ].textContent.toLowerCase();

        onLoad(() => {
            this.langLinksDesktop = document.querySelectorAll(selector.langLinksDesktop);
            this.langLinksMobile = document.querySelectorAll(selector.langLinksMobile);

            this.langLinks = [ ...this.langLinksDesktop, ...this.langLinksMobile ];
            this.init();
        });
    }

    private ajaxSettings(settings: JQuery.AjaxSettings) {
        return {
            crossDomain: true,
            cache: false,
            method: 'GET',
            dataType: 'json',
            ...settings
        };
    }

    private getSavedLang() {
        const savedLang = localStorage.getItem('language') || this.options.defaultLanguage;
        return this.options.languages.find(l => l.lang === savedLang);
    }

    init() {
        const { includedPages, excludedPages, defaultLanguage } = this.options;

        if (
            !includedPages.includes(this.pageName) || // we translate only the allowed pages
            excludedPages.includes(this.pageName) // we do not translate excluded pages
        ) {
            this.disable();
            return;
        }

        const activeLang = this.getSavedLang().lang;

        this.updateCssMenuLanguage();

        for (const a of this.langLinks) {

            const lang = a.textContent.trim().toLowerCase();

            a.addEventListener('click', e => {
                e.preventDefault();
                this.handleChangeLang(lang);
            });
        }

        // window.addEventListener('popstate', event => this.handleHashChange());
        // window.addEventListener('hashchange', event => this.handleHashChange(), false); on click

        this.loadTranslation(defaultLanguage, { onSuccess: this.onAjaxDefaultTranslationSuccess.bind(this), loadingAnimation: false });

        if (location.hash)
            this.handleHashChange();
        else {
            if (activeLang !== defaultLanguage)
                this.loadPage(activeLang);
        }
    }

    private handleHashChange() {
        const lang = location.hash.slice(1); // #fr (removes #, if no hash, then nothing)

        if (lang)
            this.handleChangeLang(lang);
    }

    private handleChangeLang(lang: string) {
        if (this.getSavedLang().lang === lang) // already translated
            return;

        this.loadPage(lang);
    }

    private get pageName() {
        return window.location.pathname.slice(1) || 'home';
    }

    private getTranslationUrl(lang: string) {
        const pageName = this.pageName;

        if (pageName.endsWith('.html')) {
            const nameMatch = pageName.match(/-(.*)\.html/);
            const name = nameMatch ? nameMatch[ 1 ] : pageName.match(/(.*)\.html/)[ 1 ];

            return `${this.domain}${pageName}?page=${name}&lang=${lang}`;
        }

        return `${this.domain}${pageName}-${lang}`;
    };

    private loadTranslation(lang: string, options: { onSuccess: AjaxSuccessCallback<TextData[]>; loadingAnimation: boolean; }) {
        try {

            const { languages } = this.options;

            this.loadingLang = lang;
            const language = languages.find(l => l.lang === lang);

            if (!language)
                return;

            if (options.loadingAnimation) {
                this.loadingAnimationPopup.startLoadingAnimation({
                    loadingMessage: `Loading "${language.name}" translation. Be patient while the network is responding`,
                    autoShow: true,
                    delay: 500
                });
            }

            this.sendAjaxRequest(this.getTranslationUrl(lang), {
                success: options.onSuccess,
                fail: this.onAjaxError.bind(this)
            });

        } catch (e) {
            console.error(e);
            // https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/
            // But for us it is ok. No dramatic if translation not working
        }
    }

    private loadPage(lang: string) {
        this.loadTranslation(lang, { onSuccess: this.onAjaxTranslationSuccess.bind(this), loadingAnimation: true });
    }


    private sendAjaxRequest(url: string, callbacks: { success: AjaxSuccessCallback<TextData[]>; fail: AjaxErrorCallback; }) {
        $.ajax(this.ajaxSettings({ url }))
            // strangely, Jquery it is not working if we pass this.onSucces.bind(this)
            .done((...args: [ data: any, textStatus: JQuery.Ajax.SuccessTextStatus, v: JQuery.jqXHR<any> ]) => callbacks.success(...args))
            .fail((...args: [ jqXHR: JQuery.jqXHR<any>, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: string ]) => callbacks.fail(...args));
    }


    private onAjaxError(_jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: string) {
        const language = this.options.languages.find(l => l.lang === this.loadingLang);

        this.loadingAnimationPopup.error(`
        <p>
            An error occured. We could not load the "${language.name}" translation of the website.
            Please, contact <a href="mailto:bug@upradata.com">bug@upradata.com</a> to help us fix the issue.
        </p>`);

        console.error('Error occured: ', { textStatus, errorThrown });
    }


    private async onAjaxDefaultTranslationSuccess(translationRows: TextData[], _textStatus: JQuery.Ajax.SuccessTextStatus, _jqXHR: JQuery.jqXHR) {
        try {
            this.generateDefaultLangExtraRowsById(translationRows);
        }
        catch (e) {
            // this.loadingAnimation.onError();
            console.error(e);
        }

        this.loadingAnimationPopup.stopLoadingAnimation({ autoClose: true });
    }

    private async onAjaxTranslationSuccess(translationRows: TextData[], _textStatus: JQuery.Ajax.SuccessTextStatus, _jqXHR: JQuery.jqXHR) {

        try {
            const rowsWithExtraField = await this.updateTextData(translationRows);
            await this.updateTextDataExtra(rowsWithExtraField);
        }
        catch (e) {
            // this.loadingAnimation.onError();
            console.error(e);
        }

        localStorage.setItem('language', this.loadingLang);
        this.loadingLang = undefined;

        this.updateCssMenuLanguage();
        this.loadingAnimationPopup.stopLoadingAnimation({ autoClose: true });
    }


    private async updateTextData(translationRows: TextData[]) {

        const updateTextContent = (textEl: Text, textData: TextData): UpdateDataReturn => {
            const { error } = t.updateText(textEl, t.getText(textData));

            if (error)
                return { code: 'error', error: new Error(error) };

            return { code: 'success' };
        };

        const update = async (extraRows: TextData[], nextTextData: IteratorResult<TextData>) => {
            const { value, done } = nextTextData;

            if (done)
                return extraRows;

            const textData = value as TextData;

            if (textData.extra)
                return update(extraRows.concat(textData), ittranslationRows.next());

            await t.updateTextData(textData, { updateText: updateTextContent }).then(({ code, error }) => {
                switch (code) {
                    case 'success': break;
                    case 'not-changed': break;
                    case 'error': console.error(textData, error); break;
                }
            }).catch(e => console.error(textData, e instanceof Error ? e : new Error(e)));

            return update(extraRows, ittranslationRows.next());;
        };

        const ittranslationRows = translationRows[ Symbol.iterator ]();
        const rowsWithExtraField = update([], ittranslationRows.next());

        return rowsWithExtraField;
    }

    private async updateTextDataExtra(rowsWithExtraField: TextData[]): Promise<void> {
        const { defaultLanguage } = this.options;

        try {

            await this.regenerateDefaultLangExtraNodes();

            if (this.loadingLang === defaultLanguage)
                return;

            const onError = (row: TextData, error: Error) => {
                console.error(`Problem getting extra TextData Dom nodes: ${rowToString(row)}\nbecause ==> ${error.message}`);
                if (error.stack)
                    console.log(error.stack);
            };

            const rowsById = te.generateRowsById(rowsWithExtraField, { onError });
            await te.updateAndreconstructPhrase(rowsById, { onError });

        } catch (e) {
            console.error('Error while handling extra text', e);
        }
    }

    private generateDefaultLangExtraRowsById(translationRows: TextData[]) {
        const onError = (row: TextData, error: Error) => {
            console.error(`Problem getting extra TextData Dom nodes: ${rowToString(row)}\nbecause ==> ${error.message}`);
            if (error.stack)
                console.log(error.stack);
        };

        const rowsWithExtraById = te.generateRowsById(translationRows.filter(row => !!row.extra), { onError });

        // keep references to original node for regenerateDefaultLangExtraNodes
        // for default language, order is  always 1,2,3,4, ...

        this.defaultLangExtraRowsById$.resolve(
            Object.entries(rowsWithExtraById).reduce((defaultLangExtraNodes, [ id, rows ]) => {
                // we retrieve the common ancestor needed in regenerateDefaultLangExtraNodes
                const nodes = rows.map(data => data.node);
                const ancestor = te.commonParent(nodes);

                const clones = rows.map(({ textData, node, options }) => ({
                    textData: textData,
                    options,
                    node: te.getChildOfTo(node, ancestor).cloneNode(true) as HTMLElement
                }));

                defaultLangExtraNodes[ id ] = { nodeTextDataList: clones, parent: ancestor };
                return defaultLangExtraNodes;

            }, {} as DefaultLangExtraNodes)
        );
    }

    private async regenerateDefaultLangExtraNodes() {
        // inject back the original extra nodes
        // right after receiving new text to keep the order of the default language as a reference
        // to rearrange the other languages extra afterwards

        const defaultLangExtraRowsById = await this.defaultLangExtraRowsById$.promise;

        for (const defaultLangRows of Object.values(defaultLangExtraRowsById)) {
            defaultLangRows.parent.innerHTML = '';

            for (const { node, textData, options } of defaultLangRows.nodeTextDataList) {
                t.updateText(node, t.applyOptionsToText(textData.text, options));
                // updateText(this.getTextElement(node), node.textContent, options);
                defaultLangRows.parent.appendChild(node);
            }
        }
    }

    private updateCssMenuLanguage() {
        const { activeLinkClass } = this.options;

        this.langLinks.forEach(a => a.classList.remove(activeLinkClass));

        const lang = this.getSavedLang().lang;

        const mobileAndDesktopLangLinks = this.langLinks.filter(a => a.textContent.trim().toLowerCase() === lang);
        mobileAndDesktopLangLinks.forEach(a => a.classList.add(activeLinkClass));
    }

    private disable() {
        const { activeLinkClass, disableLinkClass } = this.options;

        this.langLinks.forEach(a => a.classList.remove(activeLinkClass));

        this.langLinks.forEach(a => {
            a.classList.add(disableLinkClass);

            if (a.textContent.trim().toLowerCase() === this.getSavedLang().lang)
                a.classList.add('default-lang');
        });

        this.langLinks.forEach(a => a.addEventListener('click', e => e.preventDefault()));
    }
}
