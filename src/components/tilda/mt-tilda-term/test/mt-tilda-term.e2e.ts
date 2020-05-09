import { newE2EPage } from '@stencil/core/testing';

describe('mt-tilda-term', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mt-tilda-term></mt-tilda-term>');

    const element = await page.find('mt-tilda-term');
    expect(element).toHaveClass('hydrated');
  });
});
