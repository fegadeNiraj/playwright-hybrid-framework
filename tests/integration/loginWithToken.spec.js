const { test, expect } = require('../../fixtures/baseFixture');
const AuthApi = require('../../api/AuthApi');

test('Login using API token (skip UI login) @smoke @ui @api', async ({authPage})=>{

    await authPage.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await expect(authPage).toHaveURL("/client/#/dashboard/dash");

});