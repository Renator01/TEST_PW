import {test, expect} from "@playwright/test";

test('Assert in playwright', async ({page}) => {
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select')
    
    // Assert url 
    await expect(page).toHaveURL('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select');
    await page.waitForTimeout(2000);

    // Assert title
    await expect(page).toHaveTitle('Select Tag - W3Schools');
    await page.waitForTimeout(2000);
    //Assert text
    await expect(page.getByRole('heading', {name:'Select Tag'})).toBeVisible();
    await page.waitForTimeout(2000);
    //Assert element
    await expect(page.getByRole('link', {name:'W3Schools'})).toBeVisible();
    await page.waitForTimeout(2000);
    
  

});