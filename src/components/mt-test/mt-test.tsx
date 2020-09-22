import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { servicesPromise$ } from '@upradata/browser-util';
import { MtModulesServices } from '../../services';

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
        servicesPromise$<MtModulesServices>().then(({ responsive }) => {
            responsive.responsiveProp.add<string>(this.element, 'width', this.width, (prop, value, bp) => {
                console.log({ prop, value, bp });
            });
        });
    }

    @Watch('content')
    contentChanged(newValue: string, oldValue: string, propName: string) {
        console.log({ newValue, oldValue, propName });
    }


    @Watch('array')
    watchArray(newValue: any) {
        this.array = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
        console.log({ array: this.array, propName: 'width' });
    }

    componentWillLoad() {
        console.log('willLoad', { content: this.content });
        this.contentChanged(this.content, this.content, 'content');
        this.widthChanged();
        this.watchArray(this.array);
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
