import { expect, Locator, Page } from "@playwright/test";


type User = {
    firstName:string;
    lastName:string;
    email: string;
    phoneNumber: string;
    occupation: string;
    gender: 'male' | 'female';
    password: string;
    confirmPassword: string;
}

export class RegisterPage{
   page: Page;
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    phoneNumber: Locator;
    occupation: Locator;
    maleGender: Locator;
    femaleGender: Locator;
    password: Locator;
    confirmPassword: Locator;
    ageConfirmationCheckbox: Locator;
    registerButton: Locator;

    constructor(page:Page)
    {
    this.page = page;
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.phoneNumber = page.locator("#userMobile");
    this.occupation = page.locator(
    "select[formcontrolname='occupation']"
    );
    this.maleGender = page.locator("input[value='Male']");
    this.femaleGender = page.locator("input[value='Female']");
    this.password = page.locator("#userPassword");
    this.confirmPassword = page.locator("#confirmPassword");
    this.ageConfirmationCheckbox = page.locator("input[type='checkbox']");
    this.registerButton = page.locator("#login");
    }

    async goto()
    {
        await this.page.goto("/client/#/auth/register");
    }

    async register(user:User)
    {
        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.email.fill(user.email);
        await this.phoneNumber.fill(user.phoneNumber);
        await this.occupation.selectOption(user.occupation);
        if (user.gender === "male") 
        {
            await this.maleGender.check();
        } 
        else 
        {
            await this.femaleGender.check();
        }
        await this.password.fill(user.password);
        await this.confirmPassword.fill(user.confirmPassword);
        await this.ageConfirmationCheckbox.check();
        await this.registerButton.click();
    }

    async registerSucessful()
    {
        await expect(this.page.getByText("Account Created Successfully")).toBeVisible();
    }

    getErrorMessage()
    {
        return this.page.locator(".toast-message");
    }
}