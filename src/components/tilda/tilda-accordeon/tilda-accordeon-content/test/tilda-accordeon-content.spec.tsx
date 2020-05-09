import { newSpecPage } from '@stencil/core/testing';
import { MtTildaAccordeonContent } from '../tilda-accordeon-content';

describe('tilda-accordeon-content', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtTildaAccordeonContent ],
            html: `<tilda-accordeon-content></tilda-accordeon-content>`,
        });
        expect(page.root).toEqualHtml(`
      <tilda-accordeon-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tilda-accordeon-content>
    `);
    });
});
