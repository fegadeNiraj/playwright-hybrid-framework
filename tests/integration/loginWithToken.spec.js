const { test, expect } = require('../../fixtures/baseFixture');
const AuthApi = require('../../api/AuthApi');

test('Login using API token (skip UI login)', async ({ request, page }) => {

    const authApi = new AuthApi(request);

    const response = await authApi.login("test@34.com", "Password@1234");

    const body = await response.json();
    const token = body.token;

    await page.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await expect(page).toHaveURL("/client/#/dashboard/dash");

});