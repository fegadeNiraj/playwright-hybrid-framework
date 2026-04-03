class AuthApi{
    constructor(request){
        this.request = request;
        this.baseUrl = "https://rahulshettyacademy.com/api/ecom";
    }

    async login(email,password){
        const response = await this.request.post(`${this.baseUrl}/auth/login`,{
            data:{
                userEmail:email,
                userPassword:password
            }
        });

        return response;
    }
}

module.exports = AuthApi;