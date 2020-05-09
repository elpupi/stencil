/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MtTildaShortPolicyItem, } from "./components/tilda/mt-tilda-short-policy/mt-tilda-short-policy";
import { MtTildaAccordeonItem, } from "./components/tilda/tilda-accordeon/tilda-accordeon-item/tilda-accordeon-item";
export namespace Components {
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
        "gridTemplateComumns": string;
        "maxWidth": string;
        "rowGap": string;
    }
    interface MtListItem {
        "description": string;
        "header": string;
    }
    interface MtSwitchButton {
        "leftText": string;
        "rightText": string;
    }
    interface MtTest {
        "content": string;
    }
    interface MtTildaAccordeon {
    }
    interface MtTildaAccordeonContent {
    }
    interface MtTildaAccordeonHeader {
    }
    interface MtTildaAccordeonItem {
        "content": string;
        "header": string;
    }
    interface MtTildaRec {
        "blockid": string;
        "init": boolean;
        "recid": string;
    }
    interface MtTildaShortPolicy {
        "addItem": (item: MtTildaShortPolicyItem) => Promise<void>;
        "date": string;
        "footer": string;
        "header": {
            title: string;
            company: string;
        };
        "intro": string;
        "items": MtTildaShortPolicyItem[];
    }
    interface MtTildaTerm {
        "addItem": (item: MtTildaAccordeonItem) => Promise<void>;
        "footer": string;
        "header": string;
        "intro": string;
        "items": MtTildaAccordeonItem[];
    }
    interface TildaAccordeonBlock {
    }
}
declare global {
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
    interface HTMLMtTildaAccordeonContentElement extends Components.MtTildaAccordeonContent, HTMLStencilElement {
    }
    var HTMLMtTildaAccordeonContentElement: {
        prototype: HTMLMtTildaAccordeonContentElement;
        new (): HTMLMtTildaAccordeonContentElement;
    };
    interface HTMLMtTildaAccordeonHeaderElement extends Components.MtTildaAccordeonHeader, HTMLStencilElement {
    }
    var HTMLMtTildaAccordeonHeaderElement: {
        prototype: HTMLMtTildaAccordeonHeaderElement;
        new (): HTMLMtTildaAccordeonHeaderElement;
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
    interface HTMLTildaAccordeonBlockElement extends Components.TildaAccordeonBlock, HTMLStencilElement {
    }
    var HTMLTildaAccordeonBlockElement: {
        prototype: HTMLTildaAccordeonBlockElement;
        new (): HTMLTildaAccordeonBlockElement;
    };
    interface HTMLElementTagNameMap {
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
        "mt-switch-button": HTMLMtSwitchButtonElement;
        "mt-test": HTMLMtTestElement;
        "mt-tilda-accordeon": HTMLMtTildaAccordeonElement;
        "mt-tilda-accordeon-content": HTMLMtTildaAccordeonContentElement;
        "mt-tilda-accordeon-header": HTMLMtTildaAccordeonHeaderElement;
        "mt-tilda-accordeon-item": HTMLMtTildaAccordeonItemElement;
        "mt-tilda-rec": HTMLMtTildaRecElement;
        "mt-tilda-short-policy": HTMLMtTildaShortPolicyElement;
        "mt-tilda-term": HTMLMtTildaTermElement;
        "tilda-accordeon-block": HTMLTildaAccordeonBlockElement;
    }
}
declare namespace LocalJSX {
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
        "gridTemplateComumns"?: string;
        "maxWidth"?: string;
        "rowGap"?: string;
    }
    interface MtListItem {
        "description"?: string;
        "header"?: string;
    }
    interface MtSwitchButton {
        "leftText"?: string;
        "onSwitch-change"?: (event: CustomEvent<boolean>) => void;
        "rightText"?: string;
    }
    interface MtTest {
        "content"?: string;
    }
    interface MtTildaAccordeon {
    }
    interface MtTildaAccordeonContent {
    }
    interface MtTildaAccordeonHeader {
    }
    interface MtTildaAccordeonItem {
        "content"?: string;
        "header"?: string;
    }
    interface MtTildaRec {
        "blockid"?: string;
        "init"?: boolean;
        "recid"?: string;
    }
    interface MtTildaShortPolicy {
        "date"?: string;
        "footer"?: string;
        "header"?: {
            title: string;
            company: string;
        };
        "intro"?: string;
        "items"?: MtTildaShortPolicyItem[];
    }
    interface MtTildaTerm {
        "footer"?: string;
        "header"?: string;
        "intro"?: string;
        "items"?: MtTildaAccordeonItem[];
    }
    interface TildaAccordeonBlock {
    }
    interface IntrinsicElements {
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
        "mt-switch-button": MtSwitchButton;
        "mt-test": MtTest;
        "mt-tilda-accordeon": MtTildaAccordeon;
        "mt-tilda-accordeon-content": MtTildaAccordeonContent;
        "mt-tilda-accordeon-header": MtTildaAccordeonHeader;
        "mt-tilda-accordeon-item": MtTildaAccordeonItem;
        "mt-tilda-rec": MtTildaRec;
        "mt-tilda-short-policy": MtTildaShortPolicy;
        "mt-tilda-term": MtTildaTerm;
        "tilda-accordeon-block": TildaAccordeonBlock;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
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
            "mt-switch-button": LocalJSX.MtSwitchButton & JSXBase.HTMLAttributes<HTMLMtSwitchButtonElement>;
            "mt-test": LocalJSX.MtTest & JSXBase.HTMLAttributes<HTMLMtTestElement>;
            "mt-tilda-accordeon": LocalJSX.MtTildaAccordeon & JSXBase.HTMLAttributes<HTMLMtTildaAccordeonElement>;
            "mt-tilda-accordeon-content": LocalJSX.MtTildaAccordeonContent & JSXBase.HTMLAttributes<HTMLMtTildaAccordeonContentElement>;
            "mt-tilda-accordeon-header": LocalJSX.MtTildaAccordeonHeader & JSXBase.HTMLAttributes<HTMLMtTildaAccordeonHeaderElement>;
            "mt-tilda-accordeon-item": LocalJSX.MtTildaAccordeonItem & JSXBase.HTMLAttributes<HTMLMtTildaAccordeonItemElement>;
            "mt-tilda-rec": LocalJSX.MtTildaRec & JSXBase.HTMLAttributes<HTMLMtTildaRecElement>;
            "mt-tilda-short-policy": LocalJSX.MtTildaShortPolicy & JSXBase.HTMLAttributes<HTMLMtTildaShortPolicyElement>;
            "mt-tilda-term": LocalJSX.MtTildaTerm & JSXBase.HTMLAttributes<HTMLMtTildaTermElement>;
            "tilda-accordeon-block": LocalJSX.TildaAccordeonBlock & JSXBase.HTMLAttributes<HTMLTildaAccordeonBlockElement>;
        }
    }
}
