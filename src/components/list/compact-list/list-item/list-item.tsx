import { Component, ComponentInterface, h, Prop, Host } from '@stencil/core';


@Component({
    tag: 'mt-list-item',
    styleUrl: 'list-item.scss',
    shadow: false,
    scoped: true
})
export class ListItem implements ComponentInterface {
    @Prop() header: string;
    @Prop() description: string;

    render() {
        return (
            <Host>
                {this.header && <span class="title">{this.header}</span>}
                <slot name="title"></slot>
                {this.description && <span class="description">{this.description}</span>}
                <slot name="description"></slot>
            </Host>
        );
    }

}
