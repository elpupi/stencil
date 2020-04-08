import { newSpecPage } from '@stencil/core/testing';
import { SwitchButton } from './switch-button';

describe('switch-button', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ SwitchButton ],
            html: `<switch-button></switch-button>`,
        });
        expect(page.root).toEqualHtml(`
        <switch-button>
            <mock:shadow-root>
                <slot></slot>
            </mock:shadow-root>
        </switch-button>
    `);
    });
});
