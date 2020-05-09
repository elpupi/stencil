import { Component, Host, h, Prop, Method } from '@stencil/core';
import { MtTildaAccordeonItem } from '../tilda-accordeon/tilda-accordeon-item/tilda-accordeon-item';


@Component({
    tag: 'mt-tilda-term',
    styleUrl: 'mt-tilda-term.scss',
    shadow: false,
})
export class MtTildaTerm {
    @Prop() header: string;
    @Prop() intro: string;
    @Prop() footer: string;
    @Prop() items: MtTildaAccordeonItem[] = [];


    @Method()
    async addItem(item: MtTildaAccordeonItem) {
        this.items = [ ...this.items, item ];
    }

    render() {
        return (
            <Host>
                <mt-blog>
                    {this.header && <mt-block-title>{this.header}</mt-block-title>}
                    <slot name="header"></slot>

                    {this.intro && <mt-blog-block innerHTML={this.intro}></mt-blog-block>}
                    <slot name="intro"></slot>

                    <mt-tilda-rec recid="recid-mt-term-content" blockid="668">
                        <mt-tilda-accordeon-block>
                            <mt-tilda-accordeon>
                                {this.items && this.items.map(item =>
                                    <mt-tilda-accordeon-item>
                                        <mt-tilda-accordeon-header slot="header" innerHTML={item.header}></mt-tilda-accordeon-header>
                                        <mt-tilda-accordeon-content slot="content" innerHTML={item.content}></mt-tilda-accordeon-content>
                                    </mt-tilda-accordeon-item>
                                )}
                                <slot name="item"></slot>
                            </mt-tilda-accordeon>
                        </mt-tilda-accordeon-block>
                    </mt-tilda-rec>

                    <mt-blog-block>
                        {this.footer && <mt-block-title innerHTML={this.footer}></mt-block-title>}
                        <slot name="footer"></slot>
                        <slot></slot>
                    </mt-blog-block>
                </mt-blog>
            </Host>
        );
    }

}
