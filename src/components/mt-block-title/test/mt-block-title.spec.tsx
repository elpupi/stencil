import { newSpecPage } from '@stencil/core/testing';
import { MtBlockTitle } from '../mt-block-title';

describe('mt-block-title', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtBlockTitle ],
            html: `<mt-block-title></mt-block-title>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-block-title>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-block-title>
    `);
    });
});
