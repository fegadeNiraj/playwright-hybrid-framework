import {test,expect} from '../../fixtures/baseFixture';

test('User Login Test @smoke @ui',async({loginPage})=>{
    
    await loginPage.goto();
    await loginPage.login(process.env.EMAIL!,process.env.PASSWORD!);
    await loginPage.verifyLogin();
})