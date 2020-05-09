import { newE2EPage } from '@stencil/core/testing';

describe('mt-tilda-short-policy', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-tilda-short-policy></mt-tilda-short-policy>');

    const element = await page.find('mt-tilda-short-policy');
    expect(element).toHaveClass('hydrated');
  });
});
