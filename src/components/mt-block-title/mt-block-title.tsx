import { Component, Host, h, Prop } from '@stencil/core';

@Component({
    tag: 'mt-block-title',
    styleUrl: 'mt-block-title.scss',
    shadow: false,
    scoped: true
})
export class MtBlockTitle {
    @Prop() content: string;

    render() {
        return (
            <Host>
                {this.content && <h3 innerHTML={this.content}></h3>}
                <slot></slot>
            </Host>
        );
    }

}
