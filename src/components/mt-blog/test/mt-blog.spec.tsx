import { newSpecPage } from '@stencil/core/testing';
import { MtBlog } from '../mt-blog';

describe('mt-blog', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ MtBlog ],
            html: `<mt-blog></mt-blog>`,
        });
        expect(page.root).toEqualHtml(`
      <mt-blog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-blog>
    `);
    });
});
