import { newSpecPage } from '@stencil/core/testing';
import { MtListItem } from '../list-item';

describe('mt-list-item', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtListItem ],
            html: `<mt-list-item></mt-list-item>`,
        });
        expect(page.root).toEqualHtml(`
        <mt-list-item>
            <mock:shadow-root>
            <slot></slot>
            </mock:shadow-root>
        </mt-list-item>
        `);
    });
});
