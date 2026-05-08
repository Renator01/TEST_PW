import {test, expect} from "@playwright/test";

test('Assert in playwright', async ({page}) => {
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select')
    
    // Assert url 
    await expect(page).toHaveURL('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select');
    await page.waitForTimeout(2000);
    await page.frameLocator('#iframeResult').locator('select').selectOption('saab');
    // Assert value of select option
    const selectedOption = await page.frameLocator('#iframeResult').locator('select').inputValue();
    expect(selectedOption).toBe('saab');
    
    // Assert all options in select dropdown
    const options = await page.frameLocator('#iframeResult').locator('select option').allTextContents();
    expect(options).toEqual(['Volvo', 'Saab', 'Opel', 'Audi']);

    // Assert that the select element is visible
    await expect(page.frameLocator('#iframeResult').locator('select')).toBeVisible();
    
 
    // Assert that the select element is enabled
    await expect(page.frameLocator('#iframeResult').locator('select')).toBeEnabled();

    // Assert that the select element has the correct number of options
    const optionCount = await page.frameLocator('#iframeResult').locator('select option').count();
    expect(optionCount).toBe(4);

 


    

   
  

});