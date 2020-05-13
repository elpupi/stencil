import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { services$ } from '../../util/services';

@Component({
    tag: 'mt-test',
    styleUrl: 'mt-test.scss',
    shadow: false,
    scoped: false
})
export class MtTest {
    @Prop() content: string = 'test';
    @Prop({ attribute: 'array' }) array: any[] = [];
    @Prop() width: string;
    @Element() element: HTMLElement;


    @Watch('width')
    widthChanged() {
        services$.then(({ responsiveProp }) => {
            responsiveProp.add<string>(this.element, 'width', this.width, (prop, value, bp) => {
                console.log({ prop, value, bp });
            });
        });
    }

    @Watch('content')
    contentChanged(newValue: string, oldValue: string, propName: string) {
        console.log({ newValue, oldValue, propName });
    }


    @Watch('array')
    watchArray(newValue: any, _oldValue: any, propName: string) {
        this.array = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
        console.log({ array: this.array, propName });
    }

    componentWillLoad() {
        console.log({ 'willLoad': this.content });
        this.contentChanged(this.content, this.content, 'content');
        this.widthChanged();
    }
    componentDidLoad() {
        console.log({ 'didLoad': this.content });
    }

    render() {
        return (
            <Host>
                {this.content && <p innerHTML={this.content}></p>}
                {this.content && <p>{this.content}</p>}
                <slot></slot>
            </Host>
        );
    }

}
