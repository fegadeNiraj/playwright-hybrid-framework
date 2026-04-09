type EnvConfig = {
    baseurl:string;
    email:string;
    password:string;
};

const ENV = process.env.TEST_ENV || "qa";

const config:Record<string,EnvConfig> = {
    qa : {
        baseurl : "https://rahulshettyacademy.com/client/#/auth/login",
        email : process.env.EMAIL!,
        password: process.env.PASSWORD!,
    },
    dev:{
        baseurl:"https://devtest.com",
        email:"dev@test.com",
        password:"Password@123"
    },
};

export default config[ENV];