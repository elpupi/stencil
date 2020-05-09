import { newSpecPage } from '@stencil/core/testing';
import { MtTest } from '../mt-test';

describe('mt-test', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtTest ],
            html: `<mt-test></mt-test>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-test>
    `);
    });
});
