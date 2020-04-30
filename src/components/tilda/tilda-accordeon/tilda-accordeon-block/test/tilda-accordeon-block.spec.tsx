import { newSpecPage } from '@stencil/core/testing';
import { TildaAccordeonBlock } from '../tilda-accordeon-block';

describe('tilda-accordeon-block', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ TildaAccordeonBlock ],
            html: `<tilda-accordeon-block></tilda-accordeon-block>`,
        });
        expect(page.root).toEqualHtml(`
      <tilda-accordeon-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tilda-accordeon-block>
    `);
    });
});
