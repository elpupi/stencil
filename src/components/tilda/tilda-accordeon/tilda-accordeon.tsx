import { Component, ComponentInterface, h, Host, Method, Prop, Element } from '@stencil/core';
import { isElement } from '../../../util';
import { generateUniqueRecId, InitBlock } from '../util/init-block';
import { t668_init } from './tilda-init';


@Component({
    tag: 'mt-tilda-accordeon',
    styleUrl: 'tilda-accordeon.scss',
    shadow: false,
    scoped: true
})
export class MtTildaAccordeon implements ComponentInterface {
    tildaBlock: InitBlock = { recid: generateUniqueRecId('mt-tilda-accordeon'), blockid: '668' };
    tildaRec: HTMLMtTildaRecElement;
    @Prop() shadow: boolean = true;
    @Element() private el: Element;


    @Method()
    async init(force?: boolean) {
        return this.tildaRec.initBlock(force);
    }

    private waitFor() {
        // Stencil has a bug: componentDidLoad should be called after children are loaded
        // But MtTildaRec componentDidLoad is called before MtTildaAcordeonContent is loaded
        // So we have to wait with a mutation observer that the child content is loaded before
        // calling mtTildaRec.initBlock()

        let observer: MutationObserver = undefined;

        return new Promise<void>((res, _rej) => {
            // if bug fixed or if in case it is working randomly
            // class .t668__header is the tilda header of each accordeon entry
            if (this.el.querySelector('.t668__header'))
                return res();

            observer = new MutationObserver((mutationsList, _observer) => {
                const newNodes = mutationsList.filter(m => m.type === 'childList').map(m => m.addedNodes);
                const hasHeader = newNodes.some(nodeList =>
                    [ ...nodeList ].some(node => isElement(node) && [ ...node.classList ].find(c => c === 't668__header'))
                );

                if (hasHeader)
                    res();
            });

            observer.observe(this.el, { childList: true, subtree: true });
        }).then(() => observer?.disconnect());
    }

    render() {
        return (
            <Host class={{ shadow: this.shadow }}>
                <mt-tilda-rec
                    recid={this.tildaBlock.recid}
                    blockid={this.tildaBlock.blockid}
                    waitFor={this.waitFor.bind(this)}
                    getInitBlock={() => t668_init}
                    ref={el => this.tildaRec = el}>

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
