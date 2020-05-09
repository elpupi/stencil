import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'tilda-accordeon-block',
    styleUrl: 'tilda-accordeon-block.scss',
    shadow: false,
    scoped: true
})
export class MtTildaAccordeonBlock {

    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }

}
