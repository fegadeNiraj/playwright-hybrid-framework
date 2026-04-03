const{test,expect} = require('@playwright/test');
const AuthApi = require('../../api/AuthApi');

test('Login Api Test',async({request})=>{

    const authApi = new AuthApi(request);

    const response = await authApi.login("test@34.com","Password@1234");

    expect(response.status()).toBe(200);
    console.log(await response.text());
    const body = await response.json();
    console.log(body.token);
    expect(body.token).toBeTruthy();

})