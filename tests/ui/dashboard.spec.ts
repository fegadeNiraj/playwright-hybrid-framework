import { test, expect } from '../../fixtures/baseFixture';

test.describe.configure({ mode: 'serial' });

test('Verify Dashboard Products Load Successfully', async ({ dashboardPage }) => {

    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();
    const count = await dashboardPage.getProductsCount();
    expect(count).toBeGreaterThan(0);
})

test('Add single product and verify cart count', async ({ dashboardPage }) => {

    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    await dashboardPage.clearCart();
    await dashboardPage.page.reload();
    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();
    await dashboardPage.addProductToCart('ZARA COAT 3');

    await expect(dashboardPage.cartButton).toContainText('1');

})

test('Add multiple products and verify cart count', async ({ dashboardPage }) => {

    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    await dashboardPage.clearCart();
    await dashboardPage.page.reload();
    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    const products = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];

    for (let i = 0; i < products.length; i++) {
        await dashboardPage.addProductToCart(products[i]);
    }
    await dashboardPage.page.waitForLoadState('networkidle');
    await dashboardPage.verifyProductsInCart(products);

})

test('Remove product and verify cart updated', async ({ dashboardPage }) => {

    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    await dashboardPage.clearCart();
    await dashboardPage.page.reload();
    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    const products = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];

    for (let i = 0; i < products.length; i++) {
        await dashboardPage.addProductToCart(products[i]);
    }

    await dashboardPage.removeProductFromCart('ZARA COAT 3');

    await dashboardPage.verifyProductsInCart(['ADIDAS ORIGINAL']);
});