import { test, expect } from '@playwright/test';

function randomEmail() {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `teste.${Date.now()}.${randomPart}@teste.com`;
}

test('E2E Purchase Flow with Account Deletion', async ({ page }) => {
  const email = randomEmail();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  
  // Signup
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('teste');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();

  // Account Details
  await page.getByText('Mr.').click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('12345');
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('1');
  await page.locator('#years').selectOption('2021');
  await page.getByRole('textbox', { name: 'First name *' }).fill('teste');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('1');
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('tester');
  
  // Address
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('address1');
  await page.getByRole('textbox', { name: 'Address 2' }).fill('address2');
  await page.getByRole('textbox', { name: 'State *' }).fill('india');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('city india');
  await page.locator('#zipcode').fill('33333333');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('333333333333');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();

  // Add Products
  await page.locator('a[href*="product_details/29"]').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  
  await page.getByAltText('Website for automation practice').click();
  await page.locator('a[href*="product_details/33"]').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // Checkout
  await page.getByRole('link', { name: ' Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();

  // Payment
  await page.locator('input[name="name_on_card"]').fill('3333');
  await page.locator('input[name="card_number"]').fill('33');
  await page.getByRole('textbox', { name: 'ex.' }).fill('3333');
  await page.getByRole('textbox', { name: 'MM' }).fill('33');
  await page.getByRole('textbox', { name: 'YYYY' }).fill('3333');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  // Download & Cleanup
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download Invoice' }).click();
  await downloadPromise;

  await page.getByRole('link', { name: 'Delete Account' }).click();
  await page.locator('xpath=/html/body/section/div/div/div/div/a').click();
});
