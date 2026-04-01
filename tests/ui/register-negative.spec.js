const {test,expect}=require("../../fixtures/baseFixture");
const userData = require("../../test-data/userData.json")

test('Register with existing user should fail',async({registerPage,page})=>{
    await registerPage.goto();
    
    const user = userData.validUser;

    await registerPage.register(user);
    const errorMessage = registerPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/already/i);

})