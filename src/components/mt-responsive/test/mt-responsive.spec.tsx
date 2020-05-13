import { newSpecPage } from '@stencil/core/testing';
import { MtResponsive } from '../mt-responsive';

describe('mt-responsive', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtResponsive ],
            html: `<mt-responsive></mt-responsive>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-responsive>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-responsive>
    `);
    });
});
