import { newE2EPage } from '@stencil/core/testing';

describe('mt-blob-block', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<mt-blob-block></mt-blob-text>');

        const element = await page.find('mt-blob-block');
        expect(element).toHaveClass('hydrated');
    });
});
