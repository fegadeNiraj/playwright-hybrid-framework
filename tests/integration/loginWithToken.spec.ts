import {test,expect} from '../../fixtures/baseFixture';

test('Login using API token (skip UI login) @smoke @ui @api', async ({authSession})=>{

    await authSession.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await expect(authSession).toHaveURL("/client/#/dashboard/dash");

});