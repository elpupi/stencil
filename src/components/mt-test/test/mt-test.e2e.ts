import { newE2EPage } from '@stencil/core/testing';

describe('mt-test', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<mt-test></mt-test>');

        const element = await page.find('mt-test');
        expect(element).toHaveClass('hydrated');
    });
});
