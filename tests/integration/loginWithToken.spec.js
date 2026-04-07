const { test, expect } = require('../../fixtures/baseFixture');
const AuthApi = require('../../api/AuthApi');

test('Login using API token (skip UI login)', async ({authPage,page}) => {

    await authPage.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await expect(page).toHaveURL("/client/#/dashboard/dash");

});