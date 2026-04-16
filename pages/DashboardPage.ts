import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    page : Page;
    products: Locator;
    cartButton:Locator;
    constructor(page:Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
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

    async addProductToCart(productName:string) 
    {
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const product = this.products.nth(i);
            const title = await product.locator('h5').textContent();

            if (title?.trim() === productName) {
                await product.getByText('Add To Cart').click();
                return;
            }
        }

        throw new Error(`Product not found: ${productName}`);
    }

    async clearCart() 
    {
        await this.cartButton.click();

        const cartItems = this.page.locator('.items');

        if (await cartItems.count() === 0) {
            await this.page.goBack();
            return;
        }

        while (await cartItems.count() > 0) {
            const item = cartItems.first();

            await item.locator('.btn-danger').click();

            // wait until item disappears
            await expect(item).toHaveCount(0);
        }

        await this.page.goBack();
    }

}