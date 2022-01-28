import { newE2EPage } from '@stencil/core/testing';

describe('mt-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-popup></mt-popup>');

    const element = await page.find('mt-popup');
    expect(element).toHaveClass('hydrated');
  });
});
