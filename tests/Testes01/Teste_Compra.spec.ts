import { test, expect } from '@playwright/test';

function randomEmail() {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `teste.${Date.now()}.${randomPart}@teste.com`;
}

test('test', async ({ page }) => {
  const email = randomEmail();

  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();

  const signupSteps = [
    { action: async () => await page.getByRole('textbox', { name: 'Name' }).fill('teste') },
    { action: async () => await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email) },
  ];

  for (const step of signupSteps) {
    await step.action();
  }

  await page.getByRole('button', { name: 'Signup' }).click();

  const accountSteps = [
    { action: async () => await page.getByText('Mr.').click() },
    { action: async () => await page.getByRole('textbox', { name: 'Password *' }).fill('12345') },
    { action: async () => await page.locator('#days').selectOption('1') },
    { action: async () => await page.locator('#months').selectOption('1') },
    { action: async () => await page.locator('#years').selectOption('2021') },
    { action: async () => await page.getByRole('textbox', { name: 'First name *' }).fill('teste') },
    { action: async () => await page.getByRole('textbox', { name: 'Last name *' }).fill('1') },
    { action: async () => await page.getByRole('textbox', { name: 'Company', exact: true }).fill('tester') },
    { action: async () => await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('address1') },
    { action: async () => await page.getByRole('textbox', { name: 'Address 2' }).fill('address2') },
    { action: async () => await page.getByRole('textbox', { name: 'State *' }).fill('india') },
    { action: async () => await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('city india') },
    { action: async () => await page.locator('#zipcode').fill('3333333') },
    { action: async () => await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('333333333333') },
  ];

  for (const step of accountSteps) {
    await step.action();
  }

  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();

  const products = ['29', '33'];
  for (const product of products) {
    await page.locator(`a[href*="product_details/${product}"]`).click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.getByAltText('Website for automation practice').click();
  }

  await page.getByRole('link', { name: ' Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();

  const paymentSteps = [
    { action: async () => await page.locator('input[name="name_on_card"]').fill('3333') },
    { action: async () => await page.locator('input[name="card_number"]').fill('33') },
    { action: async () => await page.getByRole('textbox', { name: 'ex.' }).fill('3333') },
    { action: async () => await page.getByRole('textbox', { name: 'MM' }).fill('33') },
    { action: async () => await page.getByRole('textbox', { name: 'YYYY' }).fill('3333') },
  ];

  for (const step of paymentSteps) {
    await step.action();
  }

  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download Invoice' }).click();
  const download = await downloadPromise;
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await page.locator('xpath=/html/body/section/div/div/div/div/a').click();
});
