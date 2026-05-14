import {test, expect} from "@playwright/test";

test('Entrando em JS Introduction', async ({page}) => {
   await page.goto('https://www.w3schools.com/');
   await page.getByRole('link', { name: 'JavaScript Tutorial' }).click();
   await page.waitForTimeout(1000);
   await page.getByRole('link', { name: 'JS Introduction' }).click();
   await page.waitForTimeout(1000);
   await expect(page.getByRole('heading', { name: 'JavaScript Introduction' })).toBeVisible();
  
});

test('Entrando em JS Functions', async ({page}) => {
  await page.goto('https://www.w3schools.com/');
  await page.getByRole('link', { name: 'JavaScript Tutorial' }).click();
  await page.locator('a.overview_header[href="js_functions.asp"]').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: 'JavaScript Functions' })).toBeVisible();
});

test('Entrando em JS Objects', async ({page}) => {
  await page.goto('https://www.w3schools.com/');
  await page.getByRole('link', { name: 'JavaScript Tutorial' }).click();
  await page.locator('a.overview_header[href="js_objects.asp"]').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: 'JavaScript Objects', level: 1
    
   })).toBeVisible();
});
