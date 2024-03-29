import { onLoad } from './helpers';

declare function t868__readCustomCode(rec: HTMLElement): string;
declare function t868_setHeight(rec: HTMLElement): void;
declare function t_popup__resizePopup(recId: string): void;


export class PopupOptions {
    recid: string;

    constructor(options: PopupOptions) {
        Object.assign(this, options);
        this.recid.replace('^recrec', 'rec');
    }
}

export type CloseHandler = () => void | Promise<void>;


export class Popup {
    options: PopupOptions;
    rec: JQuery<HTMLElement>;
    popup: JQuery<HTMLElement>;
    popupContainer: JQuery<HTMLElement>;
    customCodeHTML: string; // Code inside Tilda Popup Block that can be inserted in the online editor
    isOpen: boolean = false;
    private onCloseHandlers: CloseHandler[] = [];

    constructor(options: PopupOptions) {
        this.options = new PopupOptions(options);
        onLoad(() => this.init());
    }

    onClose(handler: CloseHandler) {
        this.onCloseHandlers.push(handler);
    }

    get recId() {
        return `rec${this.options.recid.replace(/^rec/, '')}`;
    }

    init() {
        this.rec = $(`#${this.recId}`);

        if (!this.rec.get(0)) {
            console.error(`The rec block with id="${this.recId}" does not exist and it is need in Tilda`);
            return;
        }

        if (!this.popup) {
            this.popup = this.rec.find('.t-popup');
            this.popupContainer = this.rec.find('.t-popup__container');

            // fix mobile css that is overflowing the window
            // fix max-height popup
            // + add nice scrollbar => https://ishadeed.com/article/custom-scrollbars-css/
            const css = `
                <style>
                    .t-popup__container {
                        max-height: 95vh;
                        overflow: auto;
                    }

                    .mt-is-mobile .t-popup .t-popup__container {
                        max-height: 95vh;
                        margin-top: 0px;
                    }
                    
                    .t-popup__container::-webkit-scrollbar-thumb {
                        border: 4px solid transparent;
                        border-radius: 100px;
                        background-color: #c2c2c2;
                        background-clip: content-box;
                    }
                    .t-popup__container::-webkit-scrollbar-track {
                        background-color: #ffffff;
                        /* border-radius: 100px; */
                    }
                    .t-popup__container::-webkit-scrollbar {
                        width: 15px;
                    }
                </style>`;

            document.body.insertAdjacentHTML('afterbegin', css);

            this.customCodeHTML = t868__readCustomCode(this.rec.get(0));
        }

        this.initHook();
    }

    private initHook() {
        const hook = this.popup.attr('data-tooltip-hook');

        if (hook) {
            // $('.r').on('click', `a[href="${hook}"]`, _event => this.show());
            document.querySelectorAll(`a[href="#${hook}"]`).forEach(el => el.addEventListener('click', event => {
                this.show($(el).attr('data-message'));
                event.preventDefault();
            }));
        }

    }

    append(element: HTMLElement) {
        this.popupContainer?.get(0).appendChild(element);
    }

    remove(element: HTMLElement) {
        const popupContainer = this.popupContainer?.get(0);

        if (!popupContainer)
            return;

        if ([ ...popupContainer.childNodes ].find(n => n === element))
            popupContainer.removeChild(element);
    }

    clear() {
        if (this.popupContainer)
            this.popupContainer.get(0).innerHTML = ''; // get(0) to access Dom Element from JQuery
    }

    show(message?: string) {
        if (message) {
            const p = document.createElement('p');
            p.textContent = message;
            p.setAttribute('style', 'padding: 10%; text-align: center;');

            this.popupContainer?.get(0).appendChild(p);
        }

        // t868_showPopup(recid, customCodeHTML); almost copy/paste

        if (this.isOpen || !this.popupContainer)
            return;

        this.popupContainer.append(this.customCodeHTML);

        this.popup.css('display', 'block');
        t868_setHeight(this.rec.get(0));
        // setTimeout(function () {
        this.popup.find('.t-popup__container').addClass('t-popup__container-animated');
        this.popup.addClass('t-popup_show');
        // }, 50);
        $('body').addClass('t-body_popupshowed');


        this.rec.find('.t-popup').click(e => {
            if (e.target === this.popup.get(0)) {
                // t868_closePopup(this.recid)
                this.closePopup();
            }
        });

        this.rec.find('.t-popup__close').click(_e => {
            // t868_closePopup(this.recid)
            this.closePopup();
        });

        t_popup__resizePopup(this.recId);

        this.isOpen = true;
    }

    closePopup() {
        // t868_closePopup(this.recid); copy/paste
        if (this.isOpen) {
            this.popup.removeClass('t-popup_show');

            if ($('.t-popup_show').length === 0) // only this one was opened (not any in the app from here or Tilda)
                $('body').removeClass('t-body_popupshowed');

            this.popupContainer.empty();

            setTimeout(() => {
                this.popup.not('.t-popup_show').css('display', 'none');
            }, 300);

            this.onCloseHandlers.forEach(handler => handler());
            this.onCloseHandlers = [];
            this.isOpen = false;
        }
    }
}
