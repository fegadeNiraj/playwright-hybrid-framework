import {test,expect} from '../../fixtures/baseFixture';
import  userData from '../../test-data/userData.json';
import { User } from '../../types/User';

test('Register with existing user should fail @regression @ui',async({registerPage,})=>{
    await registerPage.goto();
    
    const user = userData.validUser as User;

    await registerPage.register(user);
    const errorMessage = registerPage.getErrorMessage();
    await expect(errorMessage).toHaveText(/already/i);

})