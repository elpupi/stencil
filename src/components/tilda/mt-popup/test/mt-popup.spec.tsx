import { newSpecPage } from '@stencil/core/testing';
import { MtPopup } from '../mt-popup';

describe('mt-popup', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MtPopup],
      html: `<mt-popup></mt-popup>`,
    });
    expect(page.root).toEqualHtml(`
      <mt-popup>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mt-popup>
    `);
  });
});
