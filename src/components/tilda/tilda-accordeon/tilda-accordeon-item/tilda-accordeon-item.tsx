import { Component, ComponentInterface, h, Prop } from '@stencil/core';

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
            <div class="t668__col t-col t-col_12 " style={{ marginBottom: '2px' }} >
                <div class="t668__accordion">
                    <div class="t668__wrapper">
                        {this.header && <mt-tilda-accordeon-header innerHTML={this.header}></mt-tilda-accordeon-header>}
                        <slot name="header"></slot>

                        {this.content && <mt-tilda-accordeon-content innerHTML={this.content}></mt-tilda-accordeon-content>}
                        <slot name="content"></slot>

                        <slot></slot>
                    </div>
                </div>
            </div >
        );
    }

}
