import { newE2EPage } from '@stencil/core/testing';

describe('mt-block-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-block-title></mt-block-title>');

    const element = await page.find('mt-block-title');
    expect(element).toHaveClass('hydrated');
  });
});
