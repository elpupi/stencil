import { Component, Host, Prop, h } from '@stencil/core';

@Component({
    tag: 'mt-blog-alinea',
    styleUrl: 'mt-blog-alinea.scss',
    shadow: false
})
export class MtBlogAlinea {
    @Prop() letter: string | number;
    @Prop() description: string;

    render() {
        return (
            <Host class="mt-blog-p">
                {this.letter && <span class="mt-alinea-letter" innerHTML={`${this.letter}`}></span>}
                <slot name="letter"></slot>
                {this.description && <span class="mt-linea-description" innerHTML={this.description}></span>}
                <slot name="description"></slot>
            </Host>
        );
    }

}
