import { test, expect } from "@playwright/test";

test.beforeEach('Run before each test @Smoke', async ({ page }) => {
  console.log('Running before each test');
  await page.goto("https://www.youtube.com/");
  await page.waitForTimeout(6000);
});
test('test click @Smoke', async ({ page }) => {
  
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('playwright');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Playwright Tutorial for Beginners | Playwright Full Course | Edureka' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: 'Playwright Tutorial for Beginners | Playwright Full Course | Edureka' })).toBeVisible();
});

//npx playwright test codegen ele fica gravando seu passo a passo e gera o codigo ao lado para vc copiar
