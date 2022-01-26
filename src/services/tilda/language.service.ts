import type { TextData } from '@upradata/tilda-tools/lib-esm/src/i18n/text-data/types';
import { NodeTextData, textDataExtra } from '@upradata/tilda-tools/lib-esm/src/i18n/text-data/text-data-extra';
import { UpdateDataReturn, textData } from '@upradata/tilda-tools/lib-esm/src/i18n/text-data/text-data';
import { LoadingAnimationPopup, LoadingAnimationPopupOptions } from './loading-animation-popup.service';
import { Api } from '../api';
import { onLoad } from './helpers';



const t = textData({ dom: window });
const te = textDataExtra({ dom: window });


const rowToString = (row: TextData) => {
    return `{ rootId: ${row.rootId}, path: ${row.path}, text: ${row.text} }`;
};

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
    private defaultLangExtraRowsById: DefaultLangExtraNodes = {};

    constructor(options: LanguageServiceOptions, private loadingAnimationPopup: LoadingAnimationPopup) {
        this.options = new LanguageServiceOptions(options);

        const { api, defaultLanguage, selector } = this.options;

        this.domain = location.href.includes('192.168.0') || location.href.includes('localhost') ? `http://localhost:${api.devPort}/${api.url}` : `${api.domain}/${api.url}`;

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
        const savedLang = localStorage.getItem('language');
        return this.options.languages.find(l => l.lang === savedLang);

    }

    init() {
        const { includedPages, excludedPages } = this.options;

        if (
            includedPages.length > 0 && includedPages.indexOf(this.pageName) === -1 || // we translate only the allowed pages
            excludedPages.length > 0 && excludedPages.indexOf(this.pageName) !== -1 // we do not translate excluded pages
        ) {
            this.disable();
            return;
        }

        const activeLang = this.getSavedLang()?.lang ?? this.options.defaultLanguage;

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

        if (location.hash)
            this.handleHashChange();
        else {
            if (activeLang !== this.options.defaultLanguage)
                this.loadPage(activeLang);
        }
    }

    private handleHashChange() {
        const lang = location.hash.slice(1); // #fr (removes #, if no hash, then nothing)

        if (lang)
            this.handleChangeLang(lang);
    }

    private handleChangeLang(lang: string) {
        if (this.getSavedLang()?.lang === lang) // already translated
            return;

        this.loadPage(lang);
    }

    private get pageName() {
        return window.location.pathname.slice(1) || 'home';
    }

    private loadPage(lang: string) {
        try {

            const { languages } = this.options;

            this.loadingLang = lang;

            /* const foundLang = languages.find(l => l.lang === lang);
            const language = foundLang ? foundLang.name : lang; */
            const language = languages.find(l => l.lang === lang);
            if (!language)
                return;

            // reload the page (having the default language).
            // No need to catch the text from the server service and populate the page
            /* if (lang === defaultLanguage) {
                this.loadingAnimation.startLoadingAnimation({ delay: 500 }).then(() => {
                    localStorage.setItem('language', lang);
                    window.location.href = location.origin + location.pathname;
                });
            } else { */
            const getPageUrl = () => {
                const pageName = this.pageName;

                if (pageName.endsWith('.html')) {
                    const nameMatch = pageName.match(/-(.*)\.html/);
                    const name = nameMatch ? nameMatch[ 1 ] : pageName.match(/(.*)\.html/)[ 1 ];

                    return `${this.domain}${pageName}?page=${name}&lang=${lang}`;
                }

                return `${this.domain}${pageName}-${lang}`;
            };

            this.loadingAnimationPopup.startLoadingAnimation({
                loadingMessage: `Loading "${language.name}" translation. Be patient while the network is responding`,
                errorMessage: `<p>An error occured. We could not load the "${language.name}" translation of the website. Please, contact <a href="mailto:bug@upradata.com">bug@upradata.com</a> to help us fix the issue.</p>`,
                autoShow: true,
                delay: 500
            });

            $.ajax(this.ajaxSettings({ url: getPageUrl() }))
                // strangely, Jquery it is not working if we pass this.onSucces.bind(this)
                .done((...args: [ data: any, textStatus: JQuery.Ajax.SuccessTextStatus, v: JQuery.jqXHR<any> ]) => this.onSuccess(...args))
                .fail((...args: [ jqXHR: JQuery.jqXHR<any>, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: string ]) => this.onError(...args));

            // }
        } catch (e) {
            console.error(e);
            // https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/
            // But for us it is ok. No dramatic if translation not working
        }
    }


    private onError(_jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.ErrorTextStatus, errorThrown: string) {
        this.loadingAnimationPopup.error();
        console.error('Error occured: ', { textStatus, errorThrown });
    }

    private async onSuccess(textList: TextData[], _textStatus: JQuery.Ajax.SuccessTextStatus, _jqXHR: JQuery.jqXHR) {

        try {
            const rowsWithExtraField = await this.updateTextData(textList);
            await this.updateTextDataExtra(rowsWithExtraField);
        }
        catch (e) {
            // this.loadingAnimation.onError();
            console.error(e);
        }

        localStorage.setItem('language', this.loadingLang);
        this.loadingLang = undefined;

        this.updateCssMenuLanguage();
    }


    private async updateTextData(textList: TextData[]) {

        const updateTextContent = (textEl: Text, textData: TextData): UpdateDataReturn => {
            const { error } = t.updateText(textEl, t.getText(textData));

            if (error)
                return { code: 'error', error: new Error(error) };

            return { code: 'success' };
        };

        const update = async (rowsWithExtraField: Promise<TextData[]>, textData: TextData) => {
            const extras = await rowsWithExtraField;

            if (textData.extra)
                return extras.concat(textData);

            await t.updateTextData(textData, { updateText: updateTextContent }).then(({ code, error }) => {
                switch (code) {
                    case 'success': break;
                    case 'not-changed': break;
                    case 'error': console.error(textData, error); break;
                }
            }).catch(e => console.error(textData, e instanceof Error ? e : new Error(e)));

            return extras;
        };

        const rowsWithExtraField = await textList.reduce(update, Promise.resolve<TextData[]>([]));
        return rowsWithExtraField;
    }

    private updateTextDataExtra(rowsWithExtraField: TextData[]): Promise<void> {
        const { defaultLanguage } = this.options;


        try {

            this.regenerateDefaultLangExtraNodes();

            if (this.loadingLang === defaultLanguage) {
                this.defaultLangExtraRowsById = {};
                return;
            }

            const needComputeDefaultExtraNodes = Object.values(this.defaultLangExtraRowsById).length === 0;


            const onError = (row: TextData, error: Error) => {
                console.error(`Problem getting extra TextData Dom nodes: ${rowToString(row)}\nbecause ==> ${error.message}`);
                if (error.stack)
                    console.log(error.stack);
            };

            const rowsById = te.generateRowsById(rowsWithExtraField, { onError });

            if (needComputeDefaultExtraNodes)
                this.generateDefaultLangExtraRowsById(rowsById);

            return te.updateAndreconstructPhrase(rowsById, { onError }).then(() => { });

        } catch (e) {
            console.error('Error while handling extra text', e);
        }
    }

    private generateDefaultLangExtraRowsById(extraRowsById: Record<string, NodeTextData[]>) {
        // keep references to original node for regenerateDefaultLangExtraNodes
        // for default language, order is  always 1,2,3,4, ...

        this.defaultLangExtraRowsById = Object.entries(extraRowsById).reduce((defaultLangExtraNodes, [ id, rows ]) => {
            // we retrieve the common ancestor needed in regenerateDefaultLangExtraNodes
            const nodes = rows.map(data => data.node);
            const ancestor = te.commonParent(nodes);

            const clones = rows.map(({ textData, node, options }) => ({
                textData: { ...textData, text: node.textContent }, // default language text
                options,
                node: te.getChildOfTo(node, ancestor).cloneNode(true) as HTMLElement
            }));

            defaultLangExtraNodes[ id ] = { nodeTextDataList: clones, parent: ancestor };
            return defaultLangExtraNodes;

        }, {} as DefaultLangExtraNodes);
    }

    private regenerateDefaultLangExtraNodes() {
        // inject back the original extra nodes
        // right after receiving new text to keep the order of the default language as a reference
        // to rearrange the other languages extra afterwards

        for (const defaultLangRows of Object.values(this.defaultLangExtraRowsById)) {
            defaultLangRows.parent.innerHTML = '';

            for (const { node, textData, options } of defaultLangRows.nodeTextDataList) {
                t.updateText(node, t.applyOptionsToText(textData.text, options));
                // updateText(this.getTextElement(node), node.textContent, options);
                defaultLangRows.parent.appendChild(node);
            }
        }
    }

    private updateCssMenuLanguage() {
        const { activeLinkClass, defaultLanguage } = this.options;

        // const mobileAndDesktopActiveLinks = [ ...document.querySelectorAll(`.${activeLinkClass}`) ];
        // mobileAndDesktopActiveLinks.forEach(a => a.classList.remove(activeLinkClass));
        this.langLinks.forEach(a => a.classList.remove(activeLinkClass)); // enough

        const lang = this.getSavedLang()?.lang || defaultLanguage;

        const mobileAndDesktopLangLinks = this.langLinks.filter(a => a.textContent.trim().toLowerCase() === lang);
        mobileAndDesktopLangLinks.forEach(a => a.classList.add(activeLinkClass));

        this.loadingAnimationPopup.stopLoadingAnimation({ autoClose: true });
    }

    private disable() {
        const { activeLinkClass, disableLinkClass } = this.options;

        this.langLinks.forEach(a => a.classList.remove(activeLinkClass));

        const mobileAndDesktopLangLinks = this.langLinks.filter(a => a.textContent.trim().toLowerCase() === this.getSavedLang().lang);
        mobileAndDesktopLangLinks.forEach(a => a.classList.add(disableLinkClass));

        this.langLinks.forEach(a => a.addEventListener('click', e => e.preventDefault()));
    }
}
