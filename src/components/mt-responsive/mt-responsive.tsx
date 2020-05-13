import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'mt-responsive',
    shadow: false,
})
export class MtResponsive {
    // private resizeObs: ResizeObserver;

    /* componentDidLoad() {
        this.resizeObs = new ResizeObserver(entries => {
            for (const entry of entries)
                this.updateCss(entry.contentRect.width);
        });

        this.resizeObs.observe(this.host);
    } */

    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }

}
