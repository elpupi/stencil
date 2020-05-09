import { Component, Host, Prop, h } from '@stencil/core';

declare const $: any;

@Component({
    tag: 'mt-tilda-rec',
    shadow: false,
    styles: 'mt-tilda-rec { display: block;}'
})
export class MtTildaRec {
    @Prop() recid: string;
    @Prop() blockid: string;
    @Prop() init: boolean = true;

    componentWillLoad() {
        const recid = this.recid.replace(/^rec/, '');
        const funcName = `t${this.blockid}_init`;

        try {
            if (this.init) {
                // console.log(`Calling ${funcName}(${recid})`);
                window[ funcName ] && window[ funcName ](recid);
            }
        } catch (e) {
            console.error(`Error while calling the tilda init method: ${funcName}`, e.message, e);
        }
    }

    render() {
        return (
            <Host id={this.recid}>
                <slot></slot>
            </Host>
        );
    }

}
