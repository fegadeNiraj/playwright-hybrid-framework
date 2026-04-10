import { expect, Locator, Page } from "@playwright/test";
import { title } from "node:process";

export class DashboardPage {
    page : Page;
    products: Locator;
    cart:Locator;
    cartProducts:Locator;
    constructor(page:Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cart = page.locator("//button[@routerlink='/dashboard/cart']");
        this.cartProducts = page.locator(".items");
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

    async addProductToCart(productName: string) 
    {
        const count = await this.products.count();
        let found = false;

        const cartButton = this.page.locator("//button[@routerlink='/dashboard/cart']");

        const cartTextBefore = await cartButton.textContent();
        const currentCount = Number(cartTextBefore?.match(/\d+/)?.[0] || 0);

        for (let i = 0; i < count; i++) {
            const product = this.products.nth(i);
            const title = await product.locator('h5').textContent();

            if (title?.trim() === productName) {

                await product.getByText('Add To Cart').click();

                await expect(cartButton).toContainText(String(currentCount + 1));

                found = true;
                break;
            }
        }

        if (!found) {
            throw new Error(`Product not found: ${productName}`);
        }
    }

    async verifyProductAddedToCart(productName:string)
    {
        await this.cart.click();
        let count = await this.cartProducts.count();
        let found = false;
        for(let i=0; i < count; i++)
        {
            const product = this.cartProducts.nth(i);
            const title = await product.locator('h3').textContent();

            if(title?.trim() === productName){
                found = true;
                break;
            }
        }
        if(found === false)
        {
            throw new Error("Product not found in cart: "+productName);
        }
    }

    async verifyMultipleProductsAddedToCart(productsList: string[]) 
    {
        await this.cart.click();

        await expect(this.cartProducts.first()).toBeVisible();

        const cartTitles = await this.cartProducts.locator('h3').allTextContents();

        const normalizeCartItems = cartTitles.map(title => title.trim());

        for (const expectedProduct of productsList) {
            if (!normalizeCartItems.includes(expectedProduct)) {
                throw new Error(`Product not found in cart: ${expectedProduct}`);
            }
        }
    }
}