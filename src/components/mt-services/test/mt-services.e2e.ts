import { newE2EPage } from '@stencil/core/testing';

describe('mt-services', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-services></mt-services>');

    const element = await page.find('mt-services');
    expect(element).toHaveClass('hydrated');
  });
});
