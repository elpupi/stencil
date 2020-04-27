import { newSpecPage } from '@stencil/core/testing';
import { TildaAccordeonItem } from '../tilda-accordeon-item';

describe('tilda-accordeon-item', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ TildaAccordeonItem ],
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
