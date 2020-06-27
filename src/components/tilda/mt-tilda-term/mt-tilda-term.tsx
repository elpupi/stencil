import { Component, Host, h, Prop, Method, Element, forceUpdate } from '@stencil/core';
import { MtTildaAccordeonItem } from '../tilda-accordeon/tilda-accordeon-item/tilda-accordeon-item';



@Component({
    tag: 'mt-tilda-term',
    styleUrl: 'mt-tilda-term.scss',
    shadow: false,
})
export class MtTildaTerm {
    @Element() element: HTMLElement;
    @Prop() header: string;
    @Prop() intro: string;
    @Prop() footer: string;
    @Prop() items: MtTildaAccordeonItem[] = [];
    private accordeon: HTMLMtTildaAccordeonElement;


    @Method()
    async addItem(item: MtTildaAccordeonItem) {
        this.items = [ ...this.items, item ];
    }

    @Method()
    async init(force?: boolean) {
        return this.accordeon.init(force);
    }

    @Method()
    async forceRender() {
        return forceUpdate(this.element);
    }

    render() {
        return (
            <Host>
                <mt-blog>
                    {this.header && <mt-block-title>{this.header}</mt-block-title>}
                    <slot name="header"></slot>

                    {this.intro && <mt-blog-block innerHTML={this.intro}></mt-blog-block>}
                    <slot name="intro"></slot>

                    <mt-tilda-accordeon-block >
                        <mt-tilda-accordeon no-shadow ref={el => this.accordeon = el}>
                            {this.items && this.items.map(item =>
                                <mt-tilda-accordeon-item header={item.header} content={item.content}></mt-tilda-accordeon-item>
                            )}
                            <slot name="item"></slot>
                        </mt-tilda-accordeon>
                    </mt-tilda-accordeon-block>

                    <mt-blog-block class="footer">
                        {this.footer && <mt-block-title innerHTML={this.footer}></mt-block-title>}
                        <slot name="footer"></slot>
                        <slot></slot>
                    </mt-blog-block>
                </mt-blog>
            </Host >
        );
    }

}
