const ENV = process.env.TEST_ENV || "qa";

const config = {
    qa : {
        baseurl : "https://rahulshettyacademy.com",
        email : process.env.EMAIL,
        password: process.env.PASSWORD,
    },
    dev:{
        baseurl:"https://devtest.com",
        email:"dev@test.com",
        password:"Password@123"
    },
};

module.exports = config[ENV];