import { newE2EPage } from '@stencil/core/testing';

describe('tilda-accordeon-header', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<tilda-accordeon-header></tilda-accordeon-header>');

        const element = await page.find('tilda-accordeon-header');
        expect(element).toHaveClass('hydrated');
    });
});
