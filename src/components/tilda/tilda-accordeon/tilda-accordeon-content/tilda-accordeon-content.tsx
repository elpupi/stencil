import { Component, ComponentInterface, Host, Prop, h } from '@stencil/core';
import { Fragment } from '../../../../util';
import { isDefined } from '@upradata/util';

@Component({
    tag: 'mt-tilda-accordeon-content',
    styleUrl: 'tilda-accordeon-content.scss',
    shadow: false,
    scoped: true
})
export class MtTildaAccordeonContent implements ComponentInterface {
    @Prop() header: string;
    @Prop() content: string;

    render() {
        return (
            <Host>
                {/*We cannot create 2 custom elements because jQuery (for animation) will instantiate the element with nodeName (being tagName with capital letter),
                 being forbidden in custom elements and thus generating bad behavior. When Tilda will update Jquery version, it should work though */}
                <AccordeonHeader header={this.header}>
                    <div slot="header"><slot name="header"></slot></div>
                </AccordeonHeader>

                <AccordeonContent content={this.content}>
                    <div slot="content">
                        <slot name="content"></slot>
                        <slot></slot>
                    </div>
                </AccordeonContent>
            </Host>
        );
    }
}

const AccordeonHeader = (args: { header?: string; }) => (
    <Fragment>
        <div class="t668__header">
            <div class="t668__title t-name t-name_xl" field="li_title__1480611044356">
                {isDefined(args.header) && <div class="header" innerHTML={args.header}></div>}
                <slot name="header"></slot>
            </div>

            <div class="t668__icon">
                <div class="t668__lines">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                        <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square">
                            <g transform="translate(1.000000, 1.000000)" stroke="#222222">
                                <path d="M0,11 L22,11"></path>
                                <path d="M11,0 L11,22"></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="t668__circle" style={{ backgroundColor: 'transparent' }}></div>
            </div>
            <div class="t668__icon t668__icon-hover">
                <div class="t668__lines">
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
                        <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd"
                            stroke-linecap="square">
                            <g transform="translate(1.000000, 1.000000)" stroke="#222222">
                                <path d="M0,11 L22,11"></path>
                                <path d="M11,0 L11,22"></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="t668__circle" style={{ backgroundColor: '#eee' }}></div>
            </div>
        </div>
    </Fragment>
);

const AccordeonContent = (args: { content?: string; }) => (
    <div class="t668__content">
        <div class="t668__textwrapper">
            <div class="t668__text t-descr t-descr_xs" field="li_descr__1480611044356">
                {isDefined(args.content) && <div class="content" innerHTML={args.content}></div>}
                <slot name="content"></slot>
                <slot></slot>
            </div>
        </div>
    </div>
);
