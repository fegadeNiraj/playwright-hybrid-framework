import {test,expect} from '../../fixtures/baseFixture';

test('Verify Dashboard Products Load Successfully',async({dashboardPage})=>{
    await dashboardPage.waitForDashboardPageToBeLoaded();
    await dashboardPage.waitProductsToBeVisible();
    const count = await dashboardPage.getProductsCount();
    expect(count).toBeGreaterThan(0);
})