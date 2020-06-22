import { Component, ComponentInterface, h, Host, Method, Prop } from '@stencil/core';
import { getId, InitBlock } from '../util/init-block';


@Component({
    tag: 'mt-tilda-accordeon',
    styleUrl: 'tilda-accordeon.scss',
    shadow: false,
    scoped: true
})
export class MtTildaAccordeon implements ComponentInterface {
    tildaBlock: InitBlock = { recid: getId('mt-tilda-accordeon'), blockid: '668' };
    tildaRec: HTMLMtTildaRecElement;
    @Prop() noShadow: boolean = false;


    @Method()
    async init(force?: boolean) {
        return this.tildaRec.initBlock(force);
    }

    render() {
        return (
            <Host class={{ 'no-shadow': this.noShadow }}>
                <mt-tilda-rec recid={this.tildaBlock.recid} blockid={this.tildaBlock.blockid} ref={el => this.tildaRec = el}>
                    <div class={`t${this.tildaBlock.blockid}`}>
                        <div class="t-container" id="mt-item-list">
                            <slot></slot>
                        </div>
                    </div>
                </mt-tilda-rec>
            </Host>
        );
    }

}
