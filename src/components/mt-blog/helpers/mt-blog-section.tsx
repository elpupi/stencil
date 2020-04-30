import { Component, Host, Prop, h } from '@stencil/core';

@Component({
    tag: 'mt-blog-section',
    styleUrl: 'mt-blog-section.scss',
    shadow: false
})
export class MtBlogSection {
    @Prop() content: string;

    render() {
        return (
            <Host class="mt-blog-p">
                {this.content}
                <slot></slot>
            </Host>
        );
    }

}
