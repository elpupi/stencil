import { newSpecPage } from '@stencil/core/testing';
import { SwitchButton } from '../switch-button';

describe('mt-switch-button', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ SwitchButton ],
            html: `<mt-switch-button></mt-switch-button>`,
        });
        expect(page.root).toEqualHtml(`
        <mt-switch-button>
            <mock:shadow-root>
                <slot></slot>
            </mock:shadow-root>
        </mt-switch-button>
    `);
    });
});
