import { Component, Host, Prop, h } from '@stencil/core';

@Component({
    tag: 'mt-blog-title',
    styleUrl: 'mt-blog-title.scss',
    shadow: false
})
export class MtBlogTitle {
    @Prop() header: string;
    @Prop() text: string;
    @Prop() content: string;

    render() {
        return (
            <Host>
                {this.header || this.text || this.content}
                <slot></slot>
            </Host>
        );
    }

}
