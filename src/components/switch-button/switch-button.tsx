import { Component, ComponentInterface, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
    tag: 'mt-switch-button',
    styleUrl: 'switch-button.scss',
    shadow: true,
})
export class SwitchButton implements ComponentInterface {
    @Prop() leftText: string = 'On';
    @Prop() rightText: string = 'Off';
    @State() active: boolean = false;

    @Event({
        eventName: 'switch-change',
        composed: true,
        cancelable: true,
        bubbles: true,
    }) changeState: EventEmitter<boolean>;


    private onClick() {
        this.active = !this.active;
        this.changeState.emit(this.active);
    }

    render() {
        return (
            <Host className={this.active ? 'active' : ''}>
                <span class="label left">{this.leftText}</span>

                <div class="button" onClick={() => this.onClick()}>
                    <div class="button__switch"></div>
                </div>

                <span class="label right">{this.rightText}</span>
            </Host>
        );
    }

}
