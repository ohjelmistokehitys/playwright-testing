import { BasePage } from './base-page.js';

export type Credentials = {
    email: string;
    password: string;
}

export class LoginPage extends BasePage {

    async open() {
        await this.page.goto('/');
    }

    get emailInput() {
        return this.page.getByRole('textbox', { name: 'Email' });
    }

    get passwordInput() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get signInButton() {
        return this.page.getByRole('button', { name: 'Sign in', exact: true });
    }

    async assertLoginFormIsVisible() {
        await this.assertElementIsVisible(this.emailInput);
        await this.assertElementIsVisible(this.passwordInput);
        await this.assertElementIsVisible(this.signInButton);
    }

    async fill({ email, password }: Credentials) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.signInButton.click();
    }

    async assertLoginSuccess() {
        await this.assertTextIsVisible('Welcome');
    }

    async assertLoginFailed() {
        await this.assertTextIsVisible('Invalid email or password');
    }

    async assertEmailInvalid() {
        await this.assertTextIsVisible('Please enter a valid email address.');
    }

    async assertPasswordInvalid() {
        await this.assertTextIsVisible('Password must be at least 6 characters long.');
    }
}
