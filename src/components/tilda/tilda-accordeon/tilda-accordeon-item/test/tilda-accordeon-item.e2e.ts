import { newE2EPage } from '@stencil/core/testing';

describe('mt-tilda-accordeon-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<mt-tilda-accordeon-item></mt-tilda-accordeon-item>');
        const element = await page.find('mt-tilda-accordeon-item');
        expect(element).toHaveClass('hydrated');
    });
});
