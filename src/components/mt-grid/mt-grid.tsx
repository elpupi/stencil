import { Component, Host, h, Prop, Watch, Element, State } from '@stencil/core';
import { services$ } from '../../services';

type CSSStyle = { [ K in keyof CSSStyleDeclaration ]: CSSStyleDeclaration[ K ] extends string ? CSSStyleDeclaration[ K ] : never };

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
    @Prop() gridTemplateColumns: string = 'repeat(auto-fit, minmax(200px, 1fr))';
    @Element() element: HTMLElement;

    @State() style: Partial<CSSStyle> = {};


    @Watch('rowGap')
    @Watch('columnGap')
    @Watch('maxWidth')
    @Watch('gridTemplateColumns')
    async propChanged(_newV, _oldV, propName: string) {
        const { responsive } = await services$;

        responsive.responsiveProp.add<string>(this.element, propName, this[ propName ], (prop, value, _bp) => {
            this.style = { ... this.style, [ prop ]: value };
        });
    }


    componentWillLoad() {
        this.propChanged(undefined, undefined, 'rowGap');
        this.propChanged(undefined, undefined, 'columnGap');
        this.propChanged(undefined, undefined, 'maxWidth');
        this.propChanged(undefined, undefined, 'gridTemplateColumns');
    }



    render() {
        // const { rowGap, columnGap, maxWidth, gridTemplateColumns } = this;

        return (
            <Host style={this.style}>
                <slot></slot>
            </Host>
        );
    }

}
