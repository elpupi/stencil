import { Component, ComponentInterface, h } from '@stencil/core';

@Component({
    tag: 'mt-tilda-accordeon',
    styleUrl: 'tilda-accordeon.scss',
    shadow: false,
    scoped: true
})
export class TildaAccordeon implements ComponentInterface {

    render() {
        return (
            <div class="t668">
                <div class="t-container" id="mt-item-list">
                    <slot></slot>
                </div>
            </div>
        );
    }

}
