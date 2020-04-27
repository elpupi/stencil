import { Component, ComponentInterface, h } from '@stencil/core';


@Component({
    tag: 'mt-tilda-accordeon-content',
    styleUrl: 'tilda-accordeon-content.scss',
    shadow: false,
    scoped: true
})
export class TildaAccordeonContent implements ComponentInterface {

    render() {
        return (
            <div class="t668__content">
                <div class="t668__textwrapper">
                    <div class="t668__text t-descr t-descr_xs" field="li_descr__1480611044356">
                        <slot></slot>
                    </div>
                </div>
            </div>
        );
    }

}
