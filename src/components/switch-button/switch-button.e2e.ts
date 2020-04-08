import { newE2EPage } from '@stencil/core/testing';

describe('switch-button', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<switch-button></switch-button>');

        const element = await page.find('switch-button');
        expect(element).toHaveClass('hydrated');
    });
});
