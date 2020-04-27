import { newSpecPage } from '@stencil/core/testing';
import { MtBlobBlock } from '../mt-blog-block';

describe('mt-blob-block', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtBlobBlock ],
            html: `<mt-blob-block></mt-blob-block>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-blob-block>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-blob-block>
    `);
    });
});
