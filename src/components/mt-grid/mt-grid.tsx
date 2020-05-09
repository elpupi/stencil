import { Component, Host, h, Prop } from '@stencil/core';

@Component({
    tag: 'mt-grid',
    styleUrl: 'mt-grid.scss',
    shadow: false,
    scoped: true
})
export class MtGrid {
    @Prop() rowGap: string = '60px';
    @Prop() columnGap: string = '110px';
    @Prop() maxWidth: string = '1600px';
    @Prop() gridTemplateComumns: string = 'repeat(auto-fit, minmax(200px, 1fr))';

    render() {
        const { rowGap, columnGap, maxWidth, gridTemplateComumns } = this;

        return (
            <Host style={{ rowGap: rowGap, columnGap, maxWidth, gridTemplateComumns }}>
                <slot></slot>
            </Host>
        );
    }

}
