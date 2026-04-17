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

        const cartTextBefore = await this.cartButton.textContent();
        const currentCount = Number(cartTextBefore?.match(/\d+/)?.[0] || 0);

        const product = this.products.filter({
            has: this.page.locator('h5', { hasText: productName })
        }).first();

        await expect(product).toBeVisible();
        await product.locator('button:has-text("Add To Cart")').click();

        await expect(this.cartButton).toContainText(String(currentCount + 1));

    }

    async clearCart() {
        await this.cartButton.click();

        const cartItems = this.page.locator('.items');

        while (await cartItems.count() > 0) {
            const firstItem = cartItems.first();

            await firstItem.locator('.btn-danger').click();

            await expect(firstItem).toBeHidden();
        }

        await this.page.goBack();
    }

    async verifyProductsInCart(productsList: string[]) {
        await this.cartButton.click();

        await this.page.waitForLoadState('networkidle');

        const cartItems = this.page.locator('.items');
        await expect(cartItems.first()).toBeVisible();

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