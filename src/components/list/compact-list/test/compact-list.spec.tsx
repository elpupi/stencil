import { newSpecPage } from '@stencil/core/testing';
import { MtCompactList } from '../compact-list';

describe('mt-compact-list', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtCompactList ],
            html: `<mt-compact-list></mt-compact-list>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-compact-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-compact-list>
    `);
    });
});
