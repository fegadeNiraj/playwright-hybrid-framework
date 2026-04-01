const base = require('@playwright/test')
const RegisterPage = require("../pages/RegisterPage");
const LoginPage = require("../pages/LoginPage");

const test = base.test.extend({
    registerPage: async({page},use)=>{
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    loginPage: async({page},use)=>{
        const loginPage = new LoginPage(page);
        await use(loginPage)
    }
});

module.exports = {
    test,
    expect: base.expect
};