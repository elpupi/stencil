import { newE2EPage } from '@stencil/core/testing';

describe('mt-responsive', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-responsive></mt-responsive>');

    const element = await page.find('mt-responsive');
    expect(element).toHaveClass('hydrated');
  });
});
