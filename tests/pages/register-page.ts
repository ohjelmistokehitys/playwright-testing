import { BasePage } from "./base-page.js";

export type UserInformation = {
    name: string;
    email: string;
    password: string;
}

export class RegisterPage extends BasePage {

    async open() {
        await this.page.goto('/signUp');
    }

    get nameInput() {
        return this.page.getByRole('textbox', { name: 'Name' });
    }

    get emailInput() {
        return this.page.getByRole('textbox', { name: 'Email' });
    }

    get passwordInput() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get signUpButton() {
        return this.page.getByRole('button', { name: 'Sign up', exact: true });
    }

    async fill({ name, email, password }: UserInformation) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.signUpButton.click();
    }

    async assertSignUpFormIsVisible() {
        await this.assertElementIsVisible(this.nameInput);
        await this.assertElementIsVisible(this.emailInput);
        await this.assertElementIsVisible(this.passwordInput);
        await this.assertElementIsVisible(this.signUpButton);
    }

    async assertRegistrationSuccess() {
        await this.assertTextIsVisible('Account created successfully');
    }

    async assertNameErrorIsVisible() {
        await this.assertTextIsVisible('Name is required.');
    }

    async assertEmailErrorIsVisible() {
        await this.assertTextIsVisible('Please enter a valid email address.');
    }

    async assertPasswordErrorIsVisible() {
        await this.assertTextIsVisible('Password must be at least 6 characters long.');
    }

    async assertEmailAlreadyInUseErrorIsVisible() {
        await this.assertTextIsVisible('Email is already in use');
    }
}
