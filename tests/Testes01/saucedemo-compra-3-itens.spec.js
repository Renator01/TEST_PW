const { test, expect } = require('@playwright/test');

test('compra 3 itens no Sauce Demo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page.locator('[data-test="login-credentials"]')).toContainText('standard_user');
  await expect(page.locator('[data-test="login-password"]')).toContainText('secret_sauce');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="title"]')).toHaveText('Products');

  const products = [
    {
      name: 'Sauce Labs Backpack',
      addButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
    },
    {
      name: 'Sauce Labs Bike Light',
      addButton: '[data-test="add-to-cart-sauce-labs-bike-light"]',
    },
    {
      name: 'Sauce Labs Bolt T-Shirt',
      addButton: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    },
  ];

  for (const product of products) {
    await page.locator(product.addButton).click();
  }

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  for (const product of products) {
    await expect(page.locator('[data-test="inventory-item-name"]').getByText(product.name, { exact: true })).toBeVisible();
  }

  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Teste');
  await page.locator('[data-test="lastName"]').fill('Playwright');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  for (const product of products) {
    await expect(page.locator('[data-test="inventory-item-name"]').getByText(product.name, { exact: true })).toBeVisible();
  }
  await page.waitForTimeout(2000);

  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched');
});
