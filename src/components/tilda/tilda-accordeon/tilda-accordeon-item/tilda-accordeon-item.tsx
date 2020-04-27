import { Component, ComponentInterface, h } from '@stencil/core';

@Component({
    tag: 'mt-tilda-accordeon-item',
    styleUrl: 'tilda-accordeon-item.scss',
    shadow: false,
    scoped: true
})
export class TildaAccordeonItem implements ComponentInterface {

    render() {
        return (
            <div class="t668__col t-col t-col_12 " style={{ marginBottom: '2px' }} >
                <div class="t668__accordion">
                    <div class="t668__wrapper">
                        <slot></slot>
                    </div>
                </div>
            </div >
        );
    }

}
