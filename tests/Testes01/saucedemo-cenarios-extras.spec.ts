import { expect, test, type Page } from '@playwright/test';

const baseUrl = 'https://www.saucedemo.com/';

async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  await page.goto(baseUrl);
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test('teste de exemplo para validar o ambiente', async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test.describe('Sauce Demo - cenarios extras', () => {
  test('nao permite login com senha invalida', async ({ page }) => {
    await login(page, 'standard_user', 'senha_errada');

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match',
    );
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('nao permite login com usuario bloqueado', async ({ page }) => {
    await login(page, 'locked_out_user');

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Sorry, this user has been locked out',
    );
  });

  test('ordena produtos do menor para o maior preco', async ({ page }) => {
    await login(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const pricesText = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const prices = pricesText.map((price) => Number(price.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
    
  });

  test('ordena produtos de Z para A', async ({ page }) => {
    await login(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('za');

    const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

    expect(names).toEqual(sortedNames);
  });

  

   test('ordena produtos de A para Z', async ({ page }) => {

    await login(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    
    const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    
  });


  test('remove produto do carrinho e atualiza o contador', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.getByText('Sauce Labs Backpack')).toBeHidden();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  });

  test('valida campos obrigatorios no checkout', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');

    await page.locator('[data-test="firstName"]').fill('Teste');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');

    await page.locator('[data-test="lastName"]').fill('Playwright');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('mantem produto no carrinho ao sair e entrar novamente', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await login(page);

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });
});

