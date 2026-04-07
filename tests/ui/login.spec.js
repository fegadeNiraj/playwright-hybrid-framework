const {test, expect} = require('../../fixtures/baseFixture');
require('dotenv').config();

test('User Login Test @smoke @ui',async({loginPage,page})=>{
    
    await loginPage.goto();
    await loginPage.login(process.env.EMAIL,process.env.PASSWORD);

    await expect(page).toHaveURL("/client/#/dashboard/dash");
})