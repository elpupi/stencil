import { Component, Host, Prop, h } from '@stencil/core';

@Component({
    tag: 'mt-blog-subsection',
    styleUrl: 'mt-blog-subsection.scss',
    shadow: false
})
export class MtBlogSubsection {
    @Prop() nb: string | number;
    @Prop() header: string;
    @Prop() description: string;

    render() {
        return (
            <Host class="mt-blog-p">
                {this.nb && <span class="mt-subsection-number" innerHTML={`${this.nb}`}></span>}
                <slot name="nb"></slot>

                <div class="mt-subsection-content">
                    {this.header && <span class="mt-subsection-title" innerHTML={this.header}></span>}
                    <slot name="title"></slot>
                    <slot name="header"></slot> {/* synonym */}

                    {this.description && <span class="mt-subsection-description" innerHTML={this.description}></span>}
                    <slot name="description"></slot>
                </div>
            </Host >
        );
    }

}
