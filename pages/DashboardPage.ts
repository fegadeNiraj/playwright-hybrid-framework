import { expect, Locator, Page } from "@playwright/test";
import userData from '../test-data/userData.json';
import { CheckoutInformation } from "../types/CheckoutInformation";


export class DashboardPage {
    page: Page;
    products: Locator;
    cartButton: Locator;
    creditCardNumber: Locator;
    expiryMonth: Locator;
    expiryYear: Locator;
    cvv: Locator;
    nameOnCard: Locator;
    shippingName: Locator;
    shippingCountry: Locator;
    placeOrderButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
        this.creditCardNumber = page.locator(".input.txt.text-validated").first();
        this.expiryMonth = page.locator(".input.ddl").first();
        this.expiryYear = page.locator(".input.ddl").nth(1);
        this.cvv = page.locator(".input.txt").nth(1);
        this.nameOnCard = page.locator(".input.txt").nth(2);
        this.shippingName = page.locator(".input.txt").nth(4);
        this.shippingCountry = page.locator(".input.txt").nth(5);
        this.placeOrderButton = page.getByText("Place Order");
        this.orders = page.locator("button", { hasText: '  ORDERS' });
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

    async verifyAndCheckoutProduct(productName: string) {

        await this.cartButton.click();

        const cartItems = this.page.locator('.items');

        await expect(cartItems.first()).toBeVisible();

        const product = cartItems.filter({
            has: this.page.locator('h3', { hasText: productName })
        }).first();

        await expect(product).toBeVisible();

        await product.locator('.btn-primary').click();

        await expect(this.page.locator('.item__title')).toContainText(productName);

        const checkoutData: CheckoutInformation = userData.checkoutInfo;

        await this.fillCheckoutForm(checkoutData);

        await this.placeOrderButton.click();

        await expect(this.page.getByText(' Thankyou for the order. ')).toBeVisible();

        await expect(this.page.locator('.title').first()).toContainText(productName);
    }

    async fillCheckoutForm(checkoutData: CheckoutInformation) {
        await this.creditCardNumber.clear();
        await this.creditCardNumber.fill(checkoutData.creditCardNumber);
        await this.expiryMonth.selectOption(checkoutData.expiryDate.month);
        await this.expiryYear.selectOption(checkoutData.expiryDate.year);
        await this.cvv.fill(checkoutData.cvv);
        await this.nameOnCard.fill(checkoutData.nameOnCard);
        await this.shippingName.fill(checkoutData.shippingName);
        await this.shippingCountry.pressSequentially(checkoutData.shippingCountry);
        await expect(this.page.locator('.ta-results')).toBeVisible();
        await this.page.locator("button", { hasText: 'Canada' }).click();

    }

}