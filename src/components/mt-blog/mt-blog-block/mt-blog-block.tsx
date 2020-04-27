import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'mt-blog-block',
    styleUrl: 'mt-blog-block.scss',
    shadow: false,
    scoped: false
})
export class MtBlobBlock {

    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }

}
