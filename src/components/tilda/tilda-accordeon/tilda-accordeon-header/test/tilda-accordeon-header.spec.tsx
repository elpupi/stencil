import { newSpecPage } from '@stencil/core/testing';
import { TildaAccordeonHeader } from '../tilda-accordeon-header';

describe('tilda-accordeon-header', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ TildaAccordeonHeader ],
            html: `<tilda-accordeon-header></tilda-accordeon-header>`,
        });
        expect(page.root).toEqualHtml(`
      <tilda-accordeon-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tilda-accordeon-header>
    `);
    });
});
