import { expect, Locator, Page } from "@playwright/test";
import { title } from "node:process";

export class DashboardPage {
    page : Page;
    products: Locator;
    constructor(page:Page) {
        this.page = page;
        this.products = page.locator(".card-body");
    }

    async waitForDashboardPageToBeLoaded()
    {
        await expect(this.page).toHaveURL("/client/#/dashboard/dash");
    }

    async waitProductsToBeVisible()
    {
        await expect(this.products.first()).toBeVisible();
    }

    async getProductsCount()
    {
        return this.products.count();
    }

}