import { Component, ComponentInterface, h } from '@stencil/core';

@Component({
    tag: 'mt-tilda-accordeon-header',
    styleUrl: 'tilda-accordeon-header.scss',
    shadow: false,
    scoped: true
})
export class TildaAccordeonHeader implements ComponentInterface {

    render() {
        return (
            <div class="t668__header">

                <div class="t668__title t-name t-name_xl" field="li_title__1480611044356">
                    <slot></slot>
                </div >

                <div class="t668__icon">
                    <div class="t668__lines">
                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                            <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square">
                                <g transform="translate(1.000000, 1.000000)" stroke="#222222">
                                    <path d="M0,11 L22,11"></path>
                                    <path d="M11,0 L11,22"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="t668__circle" style={{ backgroundColor: 'transparent' }}></div>
                </div>
                <div class="t668__icon t668__icon-hover">
                    <div class="t668__lines">
                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                            <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd"
                                stroke-linecap="square">
                                <g transform="translate(1.000000, 1.000000)" stroke="#222222">
                                    <path d="M0,11 L22,11"></path>
                                    <path d="M11,0 L11,22"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="t668__circle" style={{ backgroundColor: '#eee' }}></div>
                </div>
            </div >
        );
    }

}
