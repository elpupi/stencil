import { newE2EPage } from '@stencil/core/testing';

describe('tilda-accordeon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tilda-accordeon></tilda-accordeon>');

    const element = await page.find('tilda-accordeon');
    expect(element).toHaveClass('hydrated');
  });
});
