import {test, expect} from "@playwright/test";

test('Assert in playwright', async ({page}) => {
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select')
    
    // Assert url 
    await expect(page).toHaveURL('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select');
    await page.waitForTimeout(1000);

   
  

});