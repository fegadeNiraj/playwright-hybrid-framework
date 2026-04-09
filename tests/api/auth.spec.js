const{test,expect} = require('@playwright/test');
const AuthApi = require('../../api/AuthApi');

test('Login Api Test @smoke @api',async({request})=>{

    const authApi = new AuthApi(request);

    const response = await authApi.login(process.env.EMAIL,process.env.PASSWORD);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();

})