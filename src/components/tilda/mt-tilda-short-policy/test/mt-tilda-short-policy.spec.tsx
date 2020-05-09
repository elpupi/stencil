import { newSpecPage } from '@stencil/core/testing';
import { MtTildaShortPolicy } from '../mt-tilda-short-policy';

describe('mt-tilda-short-policy', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtTildaShortPolicy ],
            html: `<mt-tilda-short-policy></mt-tilda-short-policy>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-tilda-short-policy>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-tilda-short-policy>
    `);
    });
});
