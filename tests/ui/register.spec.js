const {test, expect} = require("../../fixtures/baseFixture");
const userData = require("../../test-data/userData.json");

test('Register Test',async({registerPage,page})=>{

    await registerPage.goto();

    const email = `test@${Date.now()}.com`;

    const user = {
        ...userData.validUser,
        email : email
    };

    await registerPage.register(user);
    await expect(page.getByText("Account Created Successfully")).toBeVisible();

})