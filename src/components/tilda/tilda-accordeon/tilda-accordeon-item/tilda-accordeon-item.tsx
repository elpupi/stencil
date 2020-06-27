import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'mt-tilda-accordeon-item',
    styleUrl: 'tilda-accordeon-item.scss',
    shadow: false,
    scoped: true
})
export class MtTildaAccordeonItem implements ComponentInterface {
    @Prop() header: string;
    @Prop() content: string;

    render() {
        return (
            <Host class="t668__col t-col t-col_12 " style={{ marginBottom: '2px' }} >
                <div class="t668__accordion">
                    <div class="t668__wrapper">
                        <mt-tilda-accordeon-content header={this.header} content={this.content}>
                            <slot name="header"></slot>
                            <slot name="content"></slot>
                            <slot></slot>
                        </mt-tilda-accordeon-content>
                    </div>
                </div>
            </Host >
        );
    }

}
