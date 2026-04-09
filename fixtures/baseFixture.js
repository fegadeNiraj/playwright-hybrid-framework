const base = require('@playwright/test')
const RegisterPage = require("../pages/RegisterPage");
const LoginPage = require("../pages/LoginPage");
const AuthApi = require('../api/AuthApi');
const env = require('../config/env');

const test = base.test.extend({
    registerPage: async({page},use)=>{
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    loginPage: async({page},use)=>{
        const loginPage = new LoginPage(page);
        await use(loginPage)
    },

    authPage: async({page,request},use)=>{

        const authApi = new AuthApi(request);

        const response = await authApi.login(
            env.email,
            env.password
        );

        const body = await response.json();
        const token = await body.token;

        await page.addInitScript(token => {
            window.localStorage.setItem('token', token);
        }, token);

        await use(page)
        
    }
});

module.exports = {
    test,
    expect: base.expect
};