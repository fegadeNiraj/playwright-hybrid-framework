class RegisterPage{
    constructor(page)
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

    async register(user)
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

    getErrorMessage()
    {
        return this.page.locator(".toast-message");
    }
}

module.exports = RegisterPage;