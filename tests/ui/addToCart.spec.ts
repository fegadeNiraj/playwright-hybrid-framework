import {test,expect} from '../../fixtures/baseFixture';
import { DashboardPage } from '../../pages/DashboardPage';

test('Add single product to cart and verify success @smoke @ui',async({dashboardPage})=>
{
    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();
    await dashboardPage.addProductToCart('ZARA COAT 3');
    await expect(dashboardPage.page.getByLabel('Product Added To Cart')).toBeVisible();
    const cartValue = await dashboardPage.page.locator("//button[@routerlink='/dashboard/cart']").textContent();
    expect(cartValue).toContain('1');
    await dashboardPage.verifyProductAddedToCart('ZARA COAT 3');
    
});

test.only('Add multiple products to cart and verify success @smoke @ui', async ({ dashboardPage }) => {

    const page = dashboardPage.page;

    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();

    const cartButton = page.locator("//button[@routerlink='/dashboard/cart']");

    await dashboardPage.addProductToCart('ZARA COAT 3');
    await expect(cartButton).toContainText('1');

    await dashboardPage.addProductToCart('ADIDAS ORIGINAL');
    await expect(cartButton).toContainText('2');

    const productsList = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];
    await dashboardPage.verifyMultipleProductsAddedToCart(productsList);
});