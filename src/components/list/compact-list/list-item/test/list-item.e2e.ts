import { newE2EPage } from '@stencil/core/testing';

describe('mt-list-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<mt-list-item></mt-list-item>');

        const element = await page.find('list-item');
        expect(element).toHaveClass('hydrated');
    });
});
