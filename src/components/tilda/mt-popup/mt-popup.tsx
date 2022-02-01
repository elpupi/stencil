import { Component, Host, h, Prop } from '@stencil/core';

@Component({
    tag: 'mt-popup',
    styleUrl: 'mt-popup.scss',
    shadow: false,
    scoped: false
})
export class MtPopup {
    @Prop() recid: string = '';
    @Prop() hookid: string = 'mt:popup';

    render() {
        return (
            <Host>
                <div id={this.recid} class="r t-rec" style={{ opacity: '1' }} data-animationappear="off" data-record-type="868">
                    <div class="t868">
                        <div class="t-popup" data-tooltip-hook={this.hookid}>

                            <div class="t-popup__close">
                                <div class="t-popup__close-wrapper">
                                    <svg class="t-popup__close-icon" width="23px" height="23px" viewBox="0 0 23 23"
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <g stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
                                            <rect transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) "
                                                x="10.3137085" y="-3.6862915" width="2" height="30"></rect>
                                            <rect transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) "
                                                x="10.3137085" y="-3.6862915" width="2" height="30"></rect>
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            <div class="t-popup__container t-width t-width_10">
                                {/* popup content will be here */}
                                <slot></slot>
                            </div>

                        </div>
                    </div>
                </div>
            </Host>
        );
    }

}
