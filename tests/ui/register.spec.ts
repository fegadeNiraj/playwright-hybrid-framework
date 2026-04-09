import {test,expect} from '../../fixtures/baseFixture';
import  userData from '../../test-data/userData.json';
import { User } from '../../types/User';

test('User Registration Test @regression @ui',async({registerPage})=>{

    await registerPage.goto();

    const email = `test@${Date.now()}.com`;

    const user = {
        ...userData.validUser as User,
        email : email
    };

    await registerPage.register(user);
    await registerPage.registerSucessful();
})