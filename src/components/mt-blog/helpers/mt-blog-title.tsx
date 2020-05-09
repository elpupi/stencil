import { Component, Host, Prop, h } from '@stencil/core';

@Component({
    tag: 'mt-blog-title',
    styleUrl: 'mt-blog-title.scss',
    shadow: false
})
export class MtBlogTitle {
    @Prop() content: string;

    render() {
        return (
            <Host>
                {this.content && <h2 innerHTML={this.content}></h2>}
                <slot></slot>
            </Host>
        );
    }

}
