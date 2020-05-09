import { Component, Host, h, Prop } from '@stencil/core';

@Component({
    tag: 'mt-test',
    styleUrl: 'mt-test.scss',
    shadow: false,
    scoped: false
})
export class MtTest {
    @Prop() content: string;

    render() {
        return (
            <Host>
                {this.content && <p innerHTML={this.content}></p>}
                {this.content && <p>{this.content}</p>}
                <slot></slot>
            </Host>
        );
    }

}
