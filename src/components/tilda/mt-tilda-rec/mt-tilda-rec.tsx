import { Component, Host, Prop, h, Method } from '@stencil/core';
import { ensureArray } from '@upradata/util/';
import { findRec, initBlock, InitBlock } from '../util/init-block';


@Component({
    tag: 'mt-tilda-rec',
    shadow: false,
    scoped: true,
    styles: ':host { display: block;}'
})
export class MtTildaRec {
    @Prop() recid: string;
    @Prop() blockid: string;
    @Prop() auto: boolean = true;
    @Prop() tildaBlock?: InitBlock | InitBlock[] = [];
    isInit = new Map<string, boolean>();


    @Method()
    async initBlock(force: boolean = false) {
        let blocks: InitBlock[] = [];

        if (this.blockid && this.recid) {
            const blockids = this.blockid.split(',').map(b => b.trim());
            const recids = this.recid.split(',').map(b => b.trim());

            if (recids.length === 1)
                blocks = blockids.map(blockid => ({ blockid, recid: this.recid }));
            else {
                if (blockids.length !== recids.length)
                    console.error(`Error in MtTildaRec: blockid and recid must have the same size or recid must be only one`);
                else
                    blocks = blockids.map((blockid, i) => ({ blockid, recid: recids[ i ] }));
            }
        }

        blocks = blocks.concat(...ensureArray(this.tildaBlock));

        for (let { blockid, recid, element } of blocks) {

            if (!recid && element) {
                const recEl = findRec(element);
                if (recEl)
                    recid = recEl.id;
            }

            if (recid && blockid) {
                const initOpts = { blockid, recid };

                if (!this.isInit.get(JSON.stringify(initOpts)) || force) {
                    const init = initBlock({ blockid, recid });

                    if (init)
                        this.isInit.set(JSON.stringify(initOpts), true);
                }
            } else
                console.warn(`Could not find the html block with a #rec... id to initialize the tilda component with the name "${blockid}"`);
        }
    }


    /* componentWillLoad() {
        if (this.auto)
            this.initBlock();
    } */

    componentDidLoad() {
        if (this.auto)
            this.initBlock();
    }


    render() {
        return (
            <Host id={this.recid}>
                <slot></slot>
            </Host>
        );
    }

}
