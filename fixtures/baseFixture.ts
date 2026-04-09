import { test as base, expect, Page, APIRequestContext } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import {AuthApi} from '../api/AuthApi';
import env from '../config/env';

type MyFixtures = {
    registerPage: RegisterPage;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    authSession: Page;
};

export const test = base.extend<MyFixtures>({

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ authSession }, use) => {
        await use(new DashboardPage(authSession));
    },

    authSession: async ({ page, request }, use) => {
        const authApi = new AuthApi(request as APIRequestContext);

        const response = await authApi.login(env.email, env.password);

        if (!response.ok()) {
            throw new Error('Login API failed');
        }

        const body = await response.json();

        await page.context().addInitScript((token: string) => {
            window.localStorage.setItem('token', token);
        }, body.token);

        await page.goto(env.baseurl);

        await use(page);
    }

});

export { expect };