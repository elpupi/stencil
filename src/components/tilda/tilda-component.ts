import { ensureArray } from '@upradata/util';
import { initBlock, findRec, InitBlock } from './util/init-block';


export class TildaComponent {
    tildaBlock?: InitBlock | InitBlock[] = [];
    element?: HTMLElement;
    isInit: boolean = false;


    async initBlock(options?: InitBlock | InitBlock[]) {
        const blocks = ensureArray(options || this.tildaBlock);

        for (let { blockid, recid, element } of blocks) {

            if (!recid && (this.element || element)) {
                const recEl = findRec(element || this.element);
                if (recEl)
                    recid = recEl.id;
            }

            if (recid && blockid) {
                this.isInit = initBlock({ blockid, recid });
            } else
                console.warn(`Could not find the html block with a #rec... id to initialize the tilda component with the name "${blockid}"`);
        }
    }

    componentWillLoad() {
        this.initBlock();
    }

    componentDidLoad() {
        if (!this.isInit)
            this.initBlock();
    }
}
