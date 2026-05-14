import { test, expect } from '@playwright/test';

test.describe('Example.com', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/');
  });

  test('should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
    await page.getByRole('link', { name: 'Learn more' }).click();
     await expect(page).toHaveURL(/iana\.org\/help\/example-domains/);

  });

});