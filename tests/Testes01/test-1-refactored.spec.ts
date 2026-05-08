import { test, expect } from '@playwright/test';

function randomEmail() {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `teste.${Date.now()}.${randomPart}@teste.com`;
}

test('create account and complete purchase', async ({ page }) => {
  const email = randomEmail();

  // Test data
  const userData = {
    name: 'teste',
    password: '12345',
    firstName: 'teste',
    lastName: '1',
    company: 'tester',
    address1: 'address1',
    address2: 'address2',
    state: 'india',
    city: 'city india',
    zipcode: '33333333',
    mobile: '333333333333',
    cardName: '3333',
    cardNumber: '33',
    cardCVV: '3333',
    cardExpMonth: '33',
    cardExpYear: '3333'
  };

  await page.goto('https://automationexercise.com/');

  // ===== SIGNUP FLOW =====
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(userData.name);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();

  // ===== ACCOUNT DETAILS =====
  await page.getByText('Mr.').click();
  await page.getByRole('textbox', { name: 'Password *' }).fill(userData.password);
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('1');
  await page.locator('#years').selectOption('2021');

  // ===== PERSONAL INFORMATION =====
  await page.getByRole('textbox', { name: 'First name *' }).fill(userData.firstName);
  await page.getByRole('textbox', { name: 'Last name *' }).fill(userData.lastName);
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill(userData.company);

  // ===== ADDRESS =====
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(userData.address1);
  await page.getByRole('textbox', { name: 'Address 2' }).fill(userData.address2);
  await page.getByRole('textbox', { name: 'State *' }).fill(userData.state);
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(userData.city);
  await page.locator('#zipcode').fill(userData.zipcode);
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(userData.mobile);

  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();

  // ===== SHOPPING: Add Products =====
  // Product 1
  await page.locator('a[href*="product_details/29"]').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // Product 2
  await page.getByAltText('Website for automation practice').click();
  await page.locator('a[href*="product_details/33"]').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // ===== CHECKOUT =====
  await page.getByRole('link', { name: ' Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();

  // ===== PAYMENT =====
  await page.locator('input[name="name_on_card"]').fill(userData.cardName);
  await page.locator('input[name="card_number"]').fill(userData.cardNumber);
  await page.getByRole('textbox', { name: 'ex.' }).fill(userData.cardCVV);
  await page.getByRole('textbox', { name: 'MM' }).fill(userData.cardExpMonth);
  await page.getByRole('textbox', { name: 'YYYY' }).fill(userData.cardExpYear);
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  // ===== INVOICE & CLEANUP =====
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download Invoice' }).click();
  await downloadPromise;

  await page.getByRole('link', { name: 'Delete Account' }).click();
  await page.locator('xpath=/html/body/section/div/div/div/div/a').click();
});
