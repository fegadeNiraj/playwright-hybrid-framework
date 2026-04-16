import {test,expect} from '../../fixtures/baseFixture';

test('Verify Dashboard Products Load Successfully',async({dashboardPage})=>{
    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();
    const count = await dashboardPage.getProductsCount();
    expect(count).toBeGreaterThan(0);
})

test('Add single product and verify cart count',async({dashboardPage})=>{

    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    await dashboardPage.clearCart();

    await dashboardPage.addProductToCart('ZARA COAT 3');

    await expect(dashboardPage.cartButton).toContainText('1');

})

test('Add multiple products and verify cart count',async({dashboardPage})=>{

    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    await dashboardPage.clearCart();

    const products = ['ZARA COAT 3','ADIDAS ORIGINAL'];

    for(const product of products){
        await dashboardPage.addProductToCart(product);
    }

    await expect(dashboardPage.cartButton).toContainText('2');

    await dashboardPage.verifyProductsInCart(products);

})