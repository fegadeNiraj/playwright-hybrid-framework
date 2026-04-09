import { APIRequestContext } from "@playwright/test";


export class AuthApi{
    request:APIRequestContext;
    baseUrl:string;
    constructor(request:APIRequestContext){
        this.request = request;
        this.baseUrl = "https://rahulshettyacademy.com/api/ecom";
    }

    async login(email:string,password:string){
        const response = await this.request.post(`${this.baseUrl}/auth/login`,{
            data:{
                userEmail:email,
                userPassword:password
            }
        });

        return response;
    }
}