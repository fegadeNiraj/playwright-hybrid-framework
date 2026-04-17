import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    page: Page;
    products: Locator;
    cartButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
    }

    async waitForDashboardPageToBeLoaded() {
        await expect(this.page).toHaveURL("/client/#/dashboard/dash");
    }

    async waitProductsToBeVisible() {
        await expect(this.products.first()).toBeVisible();
    }

    async getProductsCount() {
        return this.products.count();
    }

    async addProductToCart(productName: string) {
        const product = this.products.filter({
            has: this.page.locator('h5', { hasText: productName })
        }).first();

        await expect(product).toBeVisible();

        await product.getByText('Add To Cart').click();

    }

    async clearCart() {
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

    async verifyProductsInCart(productsList: string[]) {
        await this.cartButton.click();

        const cartItems = this.page.locator('.items');
        const count = await cartItems.count();

        if(count === 0)
        {
            throw new Error("Cart is empty, no products found");
        }

        const titles = await cartItems.locator('h3').allTextContents();
        const normalized = titles.map(t => t.trim());

        for (const product of productsList) {
            expect(normalized).toContain(product);
        }

    }

    async removeProductFromCart(productName: string) {

        await this.cartButton.click();

        const cartItems = this.page.locator('.items');

        await expect(cartItems.first()).toBeVisible();

        const product = cartItems.filter({
            has: this.page.locator('h3', { hasText: productName })
        }).first();

        await expect(product).toBeVisible();

        await product.locator('.btn-danger').click();

        await expect(
            cartItems.locator('h3').filter({ hasText: productName })
        ).toHaveCount(0);
    }

}