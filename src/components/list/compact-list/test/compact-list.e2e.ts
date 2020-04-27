import { newE2EPage } from '@stencil/core/testing';

describe('mt-compact-list', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<mt-compact-list></mt-compact-list>');

        const element = await page.find('mt-compact-list');
        expect(element).toHaveClass('hydrated');
    });
});
