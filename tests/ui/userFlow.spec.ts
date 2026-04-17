import { test, expect } from '../../fixtures/baseFixture';

test('User can palce order and verify in order history', async ({ dashboardPage }) => {

    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    await dashboardPage.clearCart();
    await dashboardPage.page.reload();
    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    const products = ['ZARA COAT 3'];

    for (let i = 0; i < products.length; i++) {
        await dashboardPage.addProductToCart(products[i]);
    }
    await dashboardPage.page.waitForLoadState('networkidle');
    await dashboardPage.verifyAndCheckoutProduct(products[0]);
})