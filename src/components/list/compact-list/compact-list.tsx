import { Component, ComponentInterface, Prop, Watch, h, Host } from '@stencil/core';
import { MtListItem } from './list-item/list-item';


@Component({
    tag: 'mt-compact-list',
    styleUrl: 'compact-list.scss',
    shadow: false,
    scoped: true
})
export class MtCompactList implements ComponentInterface {
    @Prop() header: string;
    @Prop() image: string;
    @Prop({ attribute: 'items' }) items: MtListItem[] = [];


    componentWillLoad() {
        this.itemsChanged(this.items);
    }


    @Watch('items')
    itemsChanged(newValue: string | MtListItem[]) {
        this.items = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    }


    render() {
        return (
            <Host>
                <slot name="image"></slot>
                {this.image && <img class="image" src={this.image} />}

                <div class="block">
                    <slot name="title"></slot>
                    <slot name="header"></slot> {/* synonym */}
                    {this.header && <h4 class="title">{this.header}</h4>}

                    <ul class="list">
                        <li>
                            <slot name="item"></slot>
                            <slot ></slot>
                        </li>

                        {this.items && this.items.map(item =>
                            <mt-list-item>
                                <h4 slot="title">{item.header}</h4>
                                <p slot="description">{item.description}</p>
                            </mt-list-item>
                        )}
                    </ul>
                </div>
            </Host>
        );
    }

}
