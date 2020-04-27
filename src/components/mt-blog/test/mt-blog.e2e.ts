import { newE2EPage } from '@stencil/core/testing';

describe('mt-blog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-blog></mt-blog>');

    const element = await page.find('mt-blog');
    expect(element).toHaveClass('hydrated');
  });
});
