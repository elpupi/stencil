import { newE2EPage } from '@stencil/core/testing';

describe('tilda-accordeon-block', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tilda-accordeon-block></tilda-accordeon-block>');

    const element = await page.find('tilda-accordeon-block');
    expect(element).toHaveClass('hydrated');
  });
});
