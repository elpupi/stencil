import { newSpecPage } from '@stencil/core/testing';
import { TildaAccordeonContent } from '../tilda-accordeon-content';

describe('tilda-accordeon-content', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ TildaAccordeonContent ],
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
