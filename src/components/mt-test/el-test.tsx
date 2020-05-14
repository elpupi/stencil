import { Component, Host, h, Prop, Watch } from '@stencil/core';

@Component({
    tag: 'el-test'
})
export class ElTest {
    @Prop({ attribute: 'array' }) array: any[];
    @Prop() prop: string;


    @Watch('prop')
    @Watch('array')
    watch(newValue: any, _, propName: string) {
        console.log({ propName, newValue });
    }

    componentWillLoad() {
        this.watch(this.array, undefined, 'array');
        this.watch(this.prop, undefined, 'prop');
    }

    render() {
        return (<Host></Host>);
    }

}
