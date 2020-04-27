import { Component, Host, Prop, h } from '@stencil/core';

@Component({
    tag: 'mt-blog-section',
    styleUrl: 'mt-blog-section.scss',
    shadow: false
})
export class MtBlogSection {
    @Prop() content: string;
    @Prop() text: string;

    render() {
        return (
            <Host>
                {this.content}
                <slot></slot>
            </Host>
        );
    }

}
