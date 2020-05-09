import { newSpecPage } from '@stencil/core/testing';
import { MtTildaTerm } from '../mt-tilda-term';

describe('mt-tilda-term', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtTildaTerm ],
            html: `<mt-tilda-term></mt-tilda-term>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-tilda-term>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-tilda-term>
    `);
    });
});
