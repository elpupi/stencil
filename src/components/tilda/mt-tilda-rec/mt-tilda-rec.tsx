import { Component, Host, Prop, h, Method } from '@stencil/core';
import { ensureArray } from '@upradata/util/';
import { findRec as findUpRec, initBlock, InitBlock } from '../util/init-block';


@Component({
    tag: 'mt-tilda-rec',
    shadow: false,
    scoped: true,
    styles: ':host { display: block;}'
})
export class MtTildaRec {
    @Prop() recid: string; // recid is the id of each block generated by Tilda Editor (id="rec167382938" for instance)
    @Prop() blockid: string; // blockid is the id of a tilda block component (t718 for a form component for instance)
    @Prop() waitFor: () => Promise<void>;
    @Prop() auto: boolean = true;
    @Prop() tildaBlock?: InitBlock | InitBlock[] = [];
    isBlockInitiated = new Map<string, boolean>();
    /* @Element() el: Element; */


    @Method()
    async initBlock(force: boolean = false) {

        // it is possible to init tilda components within a tilda block with (recid, blockid) or (element, blockid).
        // element is a DOM element reference from where we will retrieve the tilda block with a recid going up the DOM tree
        // it is possible to init few blocks in one step with (recid, blockid[]) => few blocks in one block, or (recid[], blockid[])
        // few pairs of one block / one component

        const getBlocksToInit = (): InitBlock[] => {
            if (this.blockid && this.recid) {
                const blockids = this.blockid.split(',').map(b => b.trim());
                const recids = this.recid.split(',').map(b => b.trim());

                if (recids.length === 1)
                    return blockids.map(blockid => ({ blockid, recid: this.recid }));
                else {
                    if (blockids.length !== recids.length)
                        console.error(`Error in MtTildaRec: blockid and recid must have the same size or recid must be only one`);
                    else
                        return blockids.map((blockid, i) => ({ blockid, recid: recids[ i ] }));
                }
            }

            return [] as InitBlock[];
        };

        const blocks = getBlocksToInit().concat(...ensureArray(this.tildaBlock)).map(b => {
            if (!b.recid && b.element) {
                const recEl = findUpRec(b.element);

                if (recEl)
                    return { ...b, recid: recEl.id };
            }

            return b;
        });

        for (const { blockid, recid } of blocks) {

            if (recid && blockid) {
                const initOpts = { blockid, recid };

                if (!this.isBlockInitiated.get(JSON.stringify(initOpts)) || force) {
                    const init = initBlock({ blockid, recid });

                    if (init)
                        this.isBlockInitiated.set(JSON.stringify(initOpts), true);
                }
            } else
                console.warn(`Could not find the html block with a #rec... id ("${recid}") to initialize the tilda component with the name "${blockid}"`);
        }
    }


    /* componentWillLoad() {
        if (this.auto)
            this.initBlock();
    } */

    componentDidLoad() {
        if (this.auto) {
            if (this.waitFor)
                this.waitFor().then(() => this.initBlock());
            else
                this.initBlock();
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
