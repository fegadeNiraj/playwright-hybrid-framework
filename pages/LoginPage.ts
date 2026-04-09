import { expect, Locator, Page } from '@playwright/test';

export class LoginPage{
    page : Page;
    emailInput:Locator;
    passwordInput:Locator;
    loginButton:Locator;
    constructor(page :Page){
        this.page = page;
        this.emailInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");
        this.loginButton = page.locator("#login");  
    }

    async goto()
    {
        await this.page.goto("/client/#/auth/login");
    }

    async login(email:string,password:string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLogin()
    {
        await expect(this.page).toHaveURL("/client/#/dashboard/dash");
    }
}