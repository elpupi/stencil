import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'mt-blog',
    styleUrl: 'mt-blog.scss',
    shadow: false,
    scoped: false
})
export class MtBlog {

    render() {
        return (
            <Host class="mt-blog">
                <slot></slot>
            </Host>
        );
    }

}
