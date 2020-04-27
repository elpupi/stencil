import { newE2EPage } from '@stencil/core/testing';

describe('mt-switch-button', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<mt-switch-button></mt-switch-button>');

        const element = await page.find('mt-switch-button');
        expect(element).toHaveClass('hydrated');
    });
});
