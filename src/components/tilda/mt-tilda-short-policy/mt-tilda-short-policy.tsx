import { Component, Host, h, Prop, Method } from '@stencil/core';
import { MtTildaAccordeonItem } from '../tilda-accordeon/tilda-accordeon-item/tilda-accordeon-item';
import { MtCompactList } from '../../list/compact-list/compact-list';


export interface MtTildaShortPolicyItem extends Omit<MtTildaAccordeonItem, 'content'> {
    intro: string;
    content?: string;
    lists: MtCompactList[];
}


@Component({
    tag: 'mt-tilda-short-policy',
    styleUrl: 'mt-tilda-short-policy.scss',
    shadow: false,
    scoped: true
})
export class MtTildaShortPolicy {
    @Prop() header: { title: string; company: string; };
    @Prop() date: string;
    @Prop() intro: string;
    @Prop() items: MtTildaShortPolicyItem[] = [];
    @Prop() footer: string;


    @Method()
    async addItem(item: MtTildaShortPolicyItem) {
        this.items = [ ...this.items, item ];
    }


    render() {
        return (
            <Host>
                <mt-blog>
                    <mt-blog-block>
                        {this.header && <mt-blog-title>{this.header.title}: <b>{this.header.company}</b></mt-blog-title>}
                        <slot name="header"></slot>

                        {this.date && <p><em>{this.date}</em></p>}
                        <slot name="date"></slot>

                        {this.intro && this.intro}
                        <slot name="intro"></slot>
                    </mt-blog-block>

                    <mt-tilda-rec recid="recid-mt-short-policy-content" blockid="668">
                        <mt-tilda-accordeon>
                            {this.items && this.items.map(accordeonItem =>
                                <mt-tilda-accordeon-item>
                                    <mt-tilda-accordeon-header slot="header">{accordeonItem.header}</mt-tilda-accordeon-header>
                                    <mt-tilda-accordeon-content slot="content">
                                        {accordeonItem.lists && accordeonItem.lists.map(catItem =>
                                            <mt-compact-list>
                                                <h4 slot="title">{catItem.header}</h4>
                                                <img slot="image" src={catItem.image} />

                                                {catItem.items.map(item =>
                                                    <mt-list-item>
                                                        <h4 slot="title">{item.header}</h4>
                                                        <p slot="description">{item.description}</p>
                                                    </mt-list-item>
                                                )}
                                            </mt-compact-list>
                                        )}
                                    </mt-tilda-accordeon-content>

                                    <mt-tilda-accordeon-content slot="content" innerHTML={accordeonItem.content}></mt-tilda-accordeon-content>
                                </mt-tilda-accordeon-item>
                            )}
                            <slot name="item"></slot>
                        </mt-tilda-accordeon>
                    </mt-tilda-rec>

                    <slot></slot>

                    {this.footer && <p class="footer" innerHTML={this.footer}></p>}
                    <slot name="footer"></slot>
                </mt-blog>
            </Host >
        );
    }

}
