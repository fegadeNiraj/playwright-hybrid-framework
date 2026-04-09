import {test,expect} from '../../fixtures/baseFixture';
import {AuthApi}  from '../../api/AuthApi';

test('Login Api Test @smoke @api',async({request})=>{

    const authApi = new AuthApi(request);

    const response = await authApi.login(process.env.EMAIL!,process.env.PASSWORD!);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();

})