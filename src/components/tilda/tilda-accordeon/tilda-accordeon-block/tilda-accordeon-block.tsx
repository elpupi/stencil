import { Component, Host, Prop, h } from '@stencil/core';

@Component({
    tag: 'mt-tilda-accordeon-block',
    styleUrl: 'tilda-accordeon-block.scss',
    shadow: false,
    scoped: true
})
export class MtTildaAccordeonBlock {
    @Prop() context: 'normal' | 'popup' = 'normal';
    @Prop() background: boolean = true;

    render() {
        return (
            <Host class={{ [ this.context ]: !!this.context, background: this.background }}>
                <slot></slot>
            </Host>
        );
    }

}
