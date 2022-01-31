import { Popup } from './popup.service';

export class LoadingAnimationPopupOptions {
    // popup: Popup; // = new Popup({ recid: Popup.globalPopupRecId });
    loadingMessage: string = 'Loading. Be patient while the network is responding';
    errorMessage: string = `<p>An error occured. Please, contact <a href="mailto:bug@upradata.com">bug@upradata.com</a> to get the information you wished and help us at the same time to fix the issue.</p>`;
    autoShow: boolean = false;
    autoClose: boolean = false;

    constructor(options: LoadingAnimationPopupOpts) {
        Object.assign(this, options);
    }
}

export type LoadingAnimationPopupOpts = Partial<LoadingAnimationPopupOptions>;

export class LoadingAnimationPopup {
    public options: LoadingAnimationPopupOptions;
    private errorMessage: string;
    private p: HTMLParagraphElement;
    private stopAnimation: () => void = () => { };
    private isRunning: boolean = false;


    constructor(options: LoadingAnimationPopupOpts, private popup: Popup) {
        this.options = new LoadingAnimationPopupOptions(options);
    }


    createParagraph() {
        this.p = document.createElement('p');
        this.p.setAttribute('style', 'padding: 10%; text-align: center;');
    }

    startLoadingAnimation(options: Omit<LoadingAnimationPopupOpts, 'autoClose'> & { delay?: number; } = {}) {
        const { delay = 0, autoShow, ...restOpts } = options;
        const { loadingMessage, errorMessage } = Object.assign({}, this.options, restOpts);

        return new Promise<void>((res, _rej) => {
            const makeId = () => ({
                startTimeout: undefined as number,
                loadingTextInterval: undefined as number
            });


            if (this.isRunning)
                this.stopLoadingAnimation({ autoClose: false });

            this.isRunning = true;
            this.errorMessage = errorMessage;

            const id = makeId();

            this.stopAnimation = () => {
                if (id.startTimeout)
                    clearTimeout(id.startTimeout);
                if (id.loadingTextInterval)
                    clearInterval(id.loadingTextInterval);
            };

            id.startTimeout = window.setTimeout(() => {

                if (!this.isRunning) {
                    // animation already stopped
                    res();
                    return;
                }

                this.createParagraph();

                const msg = loadingMessage;
                const loadingText = msg + '\xa0\xa0\xa0'; // \xa0 === &nbsp; non breakable space

                const p = this.p;
                p.textContent = loadingText;

                // this.options.popup.clear();
                this.popup.append(p);

                let i = 0;
                const len = loadingText.length;

                id.loadingTextInterval = window.setInterval(() => {

                    if (i === 3) {
                        p.textContent = loadingText;
                        i = 0;
                    } else {
                        p.textContent = replaceAt(p.textContent, len - (3 - i), '.');
                        ++i;
                    }

                }, 500);

                if (autoShow || this.options.autoShow) {
                    // if the popup is closed manually
                    this.popup.onClose(() => this.stopLoadingAnimation({ autoClose: false }));
                    this.popup.show();
                }

                res();
            }, delay);
        });
    }

    stopLoadingAnimation(options: { autoClose?: boolean; } = {}) {
        if (this.isRunning) {
            this.stopAnimation();

            // this.options.popup.clear();
            this.popup.remove(this.p);
            this.p = undefined;

            this.isRunning = false;

            if (options.autoClose || options.autoClose === undefined && this.options.autoClose)
                this.popup.closePopup();
        }
    }

    error(errorMessage?: string) {
        this.stopLoadingAnimation({ autoClose: false });
        this.popup.show();

        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = errorMessage || this.errorMessage || 'Error encountered!';
        errorDiv.setAttribute('style', 'padding: 10%; text-align: center;');

        this.popup.append(errorDiv);
    }

}


const replaceAt = (s: string, index: number, replacement: string) => {
    return s.substr(0, index) + replacement + s.substr(index + replacement.length);
};
