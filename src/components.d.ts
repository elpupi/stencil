/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { BreakPoint } from "./responsive";
import { MtModulesServices, MtModulesServicesConfig, MtModulesServicesOpts, TermsModuleServicesOpts, TildaModuleServicesOpts } from "./services";
import { BooleanAttribute } from "./util";
import { GetInitBlockFunc, InitBlock } from "./components/tilda/util/init-block";
import { MtTildaShortPolicyItem } from "./components/tilda/mt-tilda-short-policy/mt-tilda-short-policy";
import { MtTildaAccordeonItem } from "./components/tilda/tilda-accordeon/tilda-accordeon-item/tilda-accordeon-item";
export namespace Components {
    interface ElTest {
        "array": any[];
        "prop": string;
    }
    interface MtBlockTitle {
        "content": string;
    }
    interface MtBlog {
    }
    interface MtBlogAlinea {
        "description": string;
        "letter": string | number;
    }
    interface MtBlogBlock {
    }
    interface MtBlogSection {
        "content": string;
    }
    interface MtBlogSubsection {
        "description": string;
        "header": string;
        "nb": string | number;
    }
    interface MtBlogTitle {
        "content": string;
    }
    interface MtCompactList {
        "header": string;
        "image": string;
        "items": string;
    }
    interface MtGrid {
        "columnGap": string;
        "gridTemplateColumns": string;
        "maxWidth": string;
        "rowGap": string;
    }
    interface MtListItem {
        "description": string;
        "header": string;
    }
    interface MtPopup {
        "hookid": string;
        "recid": string;
    }
    interface MtResponsive {
    }
    interface MtServices {
        "breakpoints": BreakPoint[] | string;
        "disabled": BooleanAttribute;
        "initServices": (options: MtModulesServicesOpts) => Promise<MtModulesServices>;
        "responsive": BooleanAttribute;
        "services": () => Promise<{ responsive: { isMobile: boolean; breakpoints: BreakPoint<string, string>[]; mediaQuery: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/media-query.service").MediaQuery<import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/breakpoints").BreakpointAlias, keyof { xs: any; sm: any; premd: any; md: any; lg: any; big: any; xl: any; prehuge: any; huge: any; ltXs: any; ltSm: any; ltPremd: any; ltMd: any; ltLg: any; ltBig: any; ltXl: any; ltPrehuge: any; ltHuge: any; lteXs: any; lteSm: any; ltePremd: any; lteMd: any; lteLg: any; lteBig: any; lteXl: any; ltePrehuge: any; lteHuge: any; gtXs: any; gtSm: any; gtPremd: any; gtMd: any; gtLg: any; gtBig: any; gtXl: any; gtPrehuge: any; gtHuge: any; gteXs: any; gteSm: any; gtePremd: any; gteMd: any; gteLg: any; gteBig: any; gteXl: any; gtePrehuge: any; gteHuge: any; handset: any; handsetLandscape: any; handsetPortrait: any; tablet: any; tabletLandscape: any; tabletPortrait: any; web: any; webLandscape: any; webPortrait: any; }>; breakpointObserver: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/breakpoint-observer.service").BreakpointObserver; addResponsiveClasses: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/add-responsive-classes.service").AddResponsiveClasses; responsiveProp: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/responsive-prop.service").ResponsiveProp; }; tilda: { popup: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Popup; loadingAnimationPopup: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").LoadingAnimationPopup; language: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").LanguageService; zeroBlock: typeof import("/home/milottit/Libraries/Tilda/stencil-components/src/services/tilda/tilda-zero-block.service"); }; terms: { police: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Policy; policeShort: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").PolicyShort; terms: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Terms; }; }>;
        "setServicesOptions": (options: MtModulesServicesOpts) => Promise<void>;
        "terms": BooleanAttribute;
        "termsServicesOptions": TermsModuleServicesOpts | string;
        "tilda": BooleanAttribute;
        "tildaServicesOptions": TildaModuleServicesOpts | string;
    }
    interface MtSwitchButton {
        "leftText": string;
        "rightText": string;
    }
    interface MtTest {
        "array": any[];
        "content": string;
        "width": string;
    }
    interface MtTildaAccordeon {
        "init": (force?: boolean) => Promise<void>;
        "shadow": boolean;
    }
    interface MtTildaAccordeonBlock {
        "background": boolean;
        "context": 'normal' | 'popup';
    }
    interface MtTildaAccordeonContent {
        "content": string;
        "header": string;
    }
    interface MtTildaAccordeonItem {
        "content": string;
        "header": string;
    }
    interface MtTildaRec {
        "auto": boolean;
        "blockid": string;
        "getInitBlock": GetInitBlockFunc;
        "initBlock": (force?: boolean) => Promise<void>;
        "recid": string;
        "tildaBlock"?: InitBlock | InitBlock[];
        "waitFor": () => Promise<void>;
    }
    interface MtTildaShortPolicy {
        "addItem": (item: MtTildaShortPolicyItem) => Promise<void>;
        "date": string;
        "footer": string;
        "header": { title: string; company: string; };
        "init": () => Promise<void>;
        "intro": string;
        "items": MtTildaShortPolicyItem[];
    }
    interface MtTildaTerm {
        "accordeonShadow": boolean;
        "addItem": (item: MtTildaAccordeonItem) => Promise<void>;
        "footer": string;
        "forceRender": () => Promise<void>;
        "header": string;
        "init": (force?: boolean) => Promise<void>;
        "intro": string;
        "items": MtTildaAccordeonItem[];
        "popup": boolean;
    }
}
export interface MtSwitchButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMtSwitchButtonElement;
}
declare global {
    interface HTMLElTestElement extends Components.ElTest, HTMLStencilElement {
    }
    var HTMLElTestElement: {
        prototype: HTMLElTestElement;
        new (): HTMLElTestElement;
    };
    interface HTMLMtBlockTitleElement extends Components.MtBlockTitle, HTMLStencilElement {
    }
    var HTMLMtBlockTitleElement: {
        prototype: HTMLMtBlockTitleElement;
        new (): HTMLMtBlockTitleElement;
    };
    interface HTMLMtBlogElement extends Components.MtBlog, HTMLStencilElement {
    }
    var HTMLMtBlogElement: {
        prototype: HTMLMtBlogElement;
        new (): HTMLMtBlogElement;
    };
    interface HTMLMtBlogAlineaElement extends Components.MtBlogAlinea, HTMLStencilElement {
    }
    var HTMLMtBlogAlineaElement: {
        prototype: HTMLMtBlogAlineaElement;
        new (): HTMLMtBlogAlineaElement;
    };
    interface HTMLMtBlogBlockElement extends Components.MtBlogBlock, HTMLStencilElement {
    }
    var HTMLMtBlogBlockElement: {
        prototype: HTMLMtBlogBlockElement;
        new (): HTMLMtBlogBlockElement;
    };
    interface HTMLMtBlogSectionElement extends Components.MtBlogSection, HTMLStencilElement {
    }
    var HTMLMtBlogSectionElement: {
        prototype: HTMLMtBlogSectionElement;
        new (): HTMLMtBlogSectionElement;
    };
    interface HTMLMtBlogSubsectionElement extends Components.MtBlogSubsection, HTMLStencilElement {
    }
    var HTMLMtBlogSubsectionElement: {
        prototype: HTMLMtBlogSubsectionElement;
        new (): HTMLMtBlogSubsectionElement;
    };
    interface HTMLMtBlogTitleElement extends Components.MtBlogTitle, HTMLStencilElement {
    }
    var HTMLMtBlogTitleElement: {
        prototype: HTMLMtBlogTitleElement;
        new (): HTMLMtBlogTitleElement;
    };
    interface HTMLMtCompactListElement extends Components.MtCompactList, HTMLStencilElement {
    }
    var HTMLMtCompactListElement: {
        prototype: HTMLMtCompactListElement;
        new (): HTMLMtCompactListElement;
    };
    interface HTMLMtGridElement extends Components.MtGrid, HTMLStencilElement {
    }
    var HTMLMtGridElement: {
        prototype: HTMLMtGridElement;
        new (): HTMLMtGridElement;
    };
    interface HTMLMtListItemElement extends Components.MtListItem, HTMLStencilElement {
    }
    var HTMLMtListItemElement: {
        prototype: HTMLMtListItemElement;
        new (): HTMLMtListItemElement;
    };
    interface HTMLMtPopupElement extends Components.MtPopup, HTMLStencilElement {
    }
    var HTMLMtPopupElement: {
        prototype: HTMLMtPopupElement;
        new (): HTMLMtPopupElement;
    };
    interface HTMLMtResponsiveElement extends Components.MtResponsive, HTMLStencilElement {
    }
    var HTMLMtResponsiveElement: {
        prototype: HTMLMtResponsiveElement;
        new (): HTMLMtResponsiveElement;
    };
    interface HTMLMtServicesElement extends Components.MtServices, HTMLStencilElement {
    }
    var HTMLMtServicesElement: {
        prototype: HTMLMtServicesElement;
        new (): HTMLMtServicesElement;
    };
    interface HTMLMtSwitchButtonElement extends Components.MtSwitchButton, HTMLStencilElement {
    }
    var HTMLMtSwitchButtonElement: {
        prototype: HTMLMtSwitchButtonElement;
        new (): HTMLMtSwitchButtonElement;
    };
    interface HTMLMtTestElement extends Components.MtTest, HTMLStencilElement {
    }
    var HTMLMtTestElement: {
        prototype: HTMLMtTestElement;
        new (): HTMLMtTestElement;
    };
    interface HTMLMtTildaAccordeonElement extends Components.MtTildaAccordeon, HTMLStencilElement {
    }
    var HTMLMtTildaAccordeonElement: {
        prototype: HTMLMtTildaAccordeonElement;
        new (): HTMLMtTildaAccordeonElement;
    };
    interface HTMLMtTildaAccordeonBlockElement extends Components.MtTildaAccordeonBlock, HTMLStencilElement {
    }
    var HTMLMtTildaAccordeonBlockElement: {
        prototype: HTMLMtTildaAccordeonBlockElement;
        new (): HTMLMtTildaAccordeonBlockElement;
    };
    interface HTMLMtTildaAccordeonContentElement extends Components.MtTildaAccordeonContent, HTMLStencilElement {
    }
    var HTMLMtTildaAccordeonContentElement: {
        prototype: HTMLMtTildaAccordeonContentElement;
        new (): HTMLMtTildaAccordeonContentElement;
    };
    interface HTMLMtTildaAccordeonItemElement extends Components.MtTildaAccordeonItem, HTMLStencilElement {
    }
    var HTMLMtTildaAccordeonItemElement: {
        prototype: HTMLMtTildaAccordeonItemElement;
        new (): HTMLMtTildaAccordeonItemElement;
    };
    interface HTMLMtTildaRecElement extends Components.MtTildaRec, HTMLStencilElement {
    }
    var HTMLMtTildaRecElement: {
        prototype: HTMLMtTildaRecElement;
        new (): HTMLMtTildaRecElement;
    };
    interface HTMLMtTildaShortPolicyElement extends Components.MtTildaShortPolicy, HTMLStencilElement {
    }
    var HTMLMtTildaShortPolicyElement: {
        prototype: HTMLMtTildaShortPolicyElement;
        new (): HTMLMtTildaShortPolicyElement;
    };
    interface HTMLMtTildaTermElement extends Components.MtTildaTerm, HTMLStencilElement {
    }
    var HTMLMtTildaTermElement: {
        prototype: HTMLMtTildaTermElement;
        new (): HTMLMtTildaTermElement;
    };
    interface HTMLElementTagNameMap {
        "el-test": HTMLElTestElement;
        "mt-block-title": HTMLMtBlockTitleElement;
        "mt-blog": HTMLMtBlogElement;
        "mt-blog-alinea": HTMLMtBlogAlineaElement;
        "mt-blog-block": HTMLMtBlogBlockElement;
        "mt-blog-section": HTMLMtBlogSectionElement;
        "mt-blog-subsection": HTMLMtBlogSubsectionElement;
        "mt-blog-title": HTMLMtBlogTitleElement;
        "mt-compact-list": HTMLMtCompactListElement;
        "mt-grid": HTMLMtGridElement;
        "mt-list-item": HTMLMtListItemElement;
        "mt-popup": HTMLMtPopupElement;
        "mt-responsive": HTMLMtResponsiveElement;
        "mt-services": HTMLMtServicesElement;
        "mt-switch-button": HTMLMtSwitchButtonElement;
        "mt-test": HTMLMtTestElement;
        "mt-tilda-accordeon": HTMLMtTildaAccordeonElement;
        "mt-tilda-accordeon-block": HTMLMtTildaAccordeonBlockElement;
        "mt-tilda-accordeon-content": HTMLMtTildaAccordeonContentElement;
        "mt-tilda-accordeon-item": HTMLMtTildaAccordeonItemElement;
        "mt-tilda-rec": HTMLMtTildaRecElement;
        "mt-tilda-short-policy": HTMLMtTildaShortPolicyElement;
        "mt-tilda-term": HTMLMtTildaTermElement;
    }
}
declare namespace LocalJSX {
    interface ElTest {
        "array"?: any[];
        "prop"?: string;
    }
    interface MtBlockTitle {
        "content"?: string;
    }
    interface MtBlog {
    }
    interface MtBlogAlinea {
        "description"?: string;
        "letter"?: string | number;
    }
    interface MtBlogBlock {
    }
    interface MtBlogSection {
        "content"?: string;
    }
    interface MtBlogSubsection {
        "description"?: string;
        "header"?: string;
        "nb"?: string | number;
    }
    interface MtBlogTitle {
        "content"?: string;
    }
    interface MtCompactList {
        "header"?: string;
        "image"?: string;
        "items"?: string;
    }
    interface MtGrid {
        "columnGap"?: string;
        "gridTemplateColumns"?: string;
        "maxWidth"?: string;
        "rowGap"?: string;
    }
    interface MtListItem {
        "description"?: string;
        "header"?: string;
    }
    interface MtPopup {
        "hookid"?: string;
        "recid"?: string;
    }
    interface MtResponsive {
    }
    interface MtServices {
        "breakpoints"?: BreakPoint[] | string;
        "disabled"?: BooleanAttribute;
        "responsive"?: BooleanAttribute;
        "terms"?: BooleanAttribute;
        "termsServicesOptions"?: TermsModuleServicesOpts | string;
        "tilda"?: BooleanAttribute;
        "tildaServicesOptions"?: TildaModuleServicesOpts | string;
    }
    interface MtSwitchButton {
        "leftText"?: string;
        "onSwitch-change"?: (event: MtSwitchButtonCustomEvent<boolean>) => void;
        "rightText"?: string;
    }
    interface MtTest {
        "array"?: any[];
        "content"?: string;
        "width"?: string;
    }
    interface MtTildaAccordeon {
        "shadow"?: boolean;
    }
    interface MtTildaAccordeonBlock {
        "background"?: boolean;
        "context"?: 'normal' | 'popup';
    }
    interface MtTildaAccordeonContent {
        "content"?: string;
        "header"?: string;
    }
    interface MtTildaAccordeonItem {
        "content"?: string;
        "header"?: string;
    }
    interface MtTildaRec {
        "auto"?: boolean;
        "blockid"?: string;
        "getInitBlock"?: GetInitBlockFunc;
        "recid"?: string;
        "tildaBlock"?: InitBlock | InitBlock[];
        "waitFor"?: () => Promise<void>;
    }
    interface MtTildaShortPolicy {
        "date"?: string;
        "footer"?: string;
        "header"?: { title: string; company: string; };
        "intro"?: string;
        "items"?: MtTildaShortPolicyItem[];
    }
    interface MtTildaTerm {
        "accordeonShadow"?: boolean;
        "footer"?: string;
        "header"?: string;
        "intro"?: string;
        "items"?: MtTildaAccordeonItem[];
        "popup"?: boolean;
    }
    interface IntrinsicElements {
        "el-test": ElTest;
        "mt-block-title": MtBlockTitle;
        "mt-blog": MtBlog;
        "mt-blog-alinea": MtBlogAlinea;
        "mt-blog-block": MtBlogBlock;
        "mt-blog-section": MtBlogSection;
        "mt-blog-subsection": MtBlogSubsection;
        "mt-blog-title": MtBlogTitle;
        "mt-compact-list": MtCompactList;
        "mt-grid": MtGrid;
        "mt-list-item": MtListItem;
        "mt-popup": MtPopup;
        "mt-responsive": MtResponsive;
        "mt-services": MtServices;
        "mt-switch-button": MtSwitchButton;
        "mt-test": MtTest;
        "mt-tilda-accordeon": MtTildaAccordeon;
        "mt-tilda-accordeon-block": MtTildaAccordeonBlock;
        "mt-tilda-accordeon-content": MtTildaAccordeonContent;
        "mt-tilda-accordeon-item": MtTildaAccordeonItem;
        "mt-tilda-rec": MtTildaRec;
        "mt-tilda-short-policy": MtTildaShortPolicy;
        "mt-tilda-term": MtTildaTerm;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "el-test": LocalJSX.ElTest & JSXBase.HTMLAttributes<HTMLElTestElement>;
            "mt-block-title": LocalJSX.MtBlockTitle & JSXBase.HTMLAttributes<HTMLMtBlockTitleElement>;
            "mt-blog": LocalJSX.MtBlog & JSXBase.HTMLAttributes<HTMLMtBlogElement>;
            "mt-blog-alinea": LocalJSX.MtBlogAlinea & JSXBase.HTMLAttributes<HTMLMtBlogAlineaElement>;
            "mt-blog-block": LocalJSX.MtBlogBlock & JSXBase.HTMLAttributes<HTMLMtBlogBlockElement>;
            "mt-blog-section": LocalJSX.MtBlogSection & JSXBase.HTMLAttributes<HTMLMtBlogSectionElement>;
            "mt-blog-subsection": LocalJSX.MtBlogSubsection & JSXBase.HTMLAttributes<HTMLMtBlogSubsectionElement>;
            "mt-blog-title": LocalJSX.MtBlogTitle & JSXBase.HTMLAttributes<HTMLMtBlogTitleElement>;
            "mt-compact-list": LocalJSX.MtCompactList & JSXBase.HTMLAttributes<HTMLMtCompactListElement>;
            "mt-grid": LocalJSX.MtGrid & JSXBase.HTMLAttributes<HTMLMtGridElement>;
            "mt-list-item": LocalJSX.MtListItem & JSXBase.HTMLAttributes<HTMLMtListItemElement>;
            "mt-popup": LocalJSX.MtPopup & JSXBase.HTMLAttributes<HTMLMtPopupElement>;
            "mt-responsive": LocalJSX.MtResponsive & JSXBase.HTMLAttributes<HTMLMtResponsiveElement>;
            "mt-services": LocalJSX.MtServices & JSXBase.HTMLAttributes<HTMLMtServicesElement>;
            "mt-switch-button": LocalJSX.MtSwitchButton & JSXBase.HTMLAttributes<HTMLMtSwitchButtonElement>;
            "mt-test": LocalJSX.MtTest & JSXBase.HTMLAttributes<HTMLMtTestElement>;
            "mt-tilda-accordeon": LocalJSX.MtTildaAccordeon & JSXBase.HTMLAttributes<HTMLMtTildaAccordeonElement>;
            "mt-tilda-accordeon-block": LocalJSX.MtTildaAccordeonBlock & JSXBase.HTMLAttributes<HTMLMtTildaAccordeonBlockElement>;
            "mt-tilda-accordeon-content": LocalJSX.MtTildaAccordeonContent & JSXBase.HTMLAttributes<HTMLMtTildaAccordeonContentElement>;
            "mt-tilda-accordeon-item": LocalJSX.MtTildaAccordeonItem & JSXBase.HTMLAttributes<HTMLMtTildaAccordeonItemElement>;
            "mt-tilda-rec": LocalJSX.MtTildaRec & JSXBase.HTMLAttributes<HTMLMtTildaRecElement>;
            "mt-tilda-short-policy": LocalJSX.MtTildaShortPolicy & JSXBase.HTMLAttributes<HTMLMtTildaShortPolicyElement>;
            "mt-tilda-term": LocalJSX.MtTildaTerm & JSXBase.HTMLAttributes<HTMLMtTildaTermElement>;
        }
    }
}
