import { test, expect } from "@playwright/test";

test.beforeEach("Run before each test", async ({ page }) => {
  console.log("Running before each test");
  await page.goto("https://www.saucedemo.com/");
 

  await page.getByPlaceholder("Username").fill("standard_user");
  
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
 
});

test("testCompra", async ({ page }) => {
  await page.getByAltText("Sauce Labs Backpack").click();
  
  await page.getByRole("button", { name: "Add to cart" }).click();
  
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  await page.locator('[data-test="shopping-cart-link"]').click();
  
  await page.locator('[data-test="checkout"]').click();
  
  await page.getByPlaceholder("First Name").fill("Teste");
  
  await page.getByPlaceholder("Last Name").fill("Teste");
  
  await page.getByPlaceholder("Postal Code").fill("Teste");
  await page.locator('[data-test="continue"]').click();
  
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  await page.locator('[data-test="finish"]').click();
  
  await expect(page.getByText("Thank you for your order!")).toBeVisible();


});


