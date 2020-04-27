import { newE2EPage } from '@stencil/core/testing';

describe('tilda-accordeon-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tilda-accordeon-content></tilda-accordeon-content>');

    const element = await page.find('tilda-accordeon-content');
    expect(element).toHaveClass('hydrated');
  });
});
