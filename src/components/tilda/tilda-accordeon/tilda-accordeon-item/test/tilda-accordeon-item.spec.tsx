import { newSpecPage } from '@stencil/core/testing';
import { MtTildaAccordeonItem } from '../tilda-accordeon-item';

describe('tilda-accordeon-item', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtTildaAccordeonItem ],
            html: `<tilda-accordeon-item></tilda-accordeon-item>`,
        });
        expect(page.root).toEqualHtml(`
      <tilda-accordeon-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tilda-accordeon-item>
    `);
    });
});
