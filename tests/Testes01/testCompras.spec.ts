import { test, expect } from "@playwright/test";

test.beforeEach("Run before each test", async ({ page }) => {
  console.log("Running before each test");
  await page.goto("https://www.saucedemo.com/");
  await page.waitForTimeout(2000);
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.waitForTimeout(2000);
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(2000);
});

test("testCompra", async ({ page }) => {
  await page.getByAltText("Sauce Labs Backpack").click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[data-test="checkout"]').click();
  await page.getByPlaceholder("First Name").click();
  await page.getByPlaceholder("First Name").fill("Teste");
  await page.getByPlaceholder("Last Name").click();
  await page.getByPlaceholder("Last Name").fill("Teste");
  await page.getByPlaceholder("Postal Code").click();
  await page.getByPlaceholder("Postal Code").fill("Teste");
  await page.locator('[data-test="continue"]').click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  await page.locator('[data-test="finish"]').click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Thank you for your order!")).toBeVisible();


});


