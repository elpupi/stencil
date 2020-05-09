import { newSpecPage } from '@stencil/core/testing';
import { MtGrid } from '../mt-grid';

describe('mt-grid', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtGrid ],
            html: `<mt-grid></mt-grid>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-grid>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-grid>
    `);
    });
});
