const {test, expect} = require('../../fixtures/baseFixture');

test('Login Test',async({loginPage,page})=>{
    
    await loginPage.goto();
    await loginPage.login("test@34.com","Password@1234");

    await expect(page).toHaveURL("/client/#/dashboard/dash");
})