import { newE2EPage } from '@stencil/core/testing';

describe('mt-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-grid></mt-grid>');

    const element = await page.find('mt-grid');
    expect(element).toHaveClass('hydrated');
  });
});
