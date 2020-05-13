import { newSpecPage } from '@stencil/core/testing';
import { MtServices } from '../mt-services';

describe('mt-services', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtServices ],
            html: `<mt-services></mt-services>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-services>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-services>
    `);
    });
});
