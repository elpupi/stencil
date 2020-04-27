import { Component, ComponentInterface, h, Host, Prop, State, Event, Element, EventEmitter } from '@stencil/core';

@Component({
    tag: 'mt-switch-button',
    styleUrl: 'switch-button.scss',
    shadow: false,
    scoped: true
})
export class SwitchButton implements ComponentInterface {
    @Element() host: HTMLElement;

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
        if (this.active)
            this.host.classList.add('active');
        else
            this.host.classList.remove('active');

        //  className={this.host.classList.toString()}
        return (
            <Host>
                <span class="label left">{this.leftText}</span>

                <div class="button" onClick={() => this.onClick()}>
                    <div class="button__switch"></div>
                </div>

                <span class="label right">{this.rightText}</span>
            </Host>
        );
    }

}
