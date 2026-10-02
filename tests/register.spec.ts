import { test } from '@playwright/test';
import { LoginPage } from './pages/login-page.js';
import { RegisterPage } from './pages/register-page.js';

const existingUser = {
    email: process.env.USER1_USERNAME!,
    password: process.env.USER1_PASSWORD!
}

test.describe('Registering', () => {

    test.beforeEach(async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.open();
    });

    test('homepage contains a registration form', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.assertSignUpFormIsVisible();
    });

    test('registration requires name, email and password', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.submit();

        await registerPage.assertNameErrorIsVisible();
        await registerPage.assertEmailErrorIsVisible();
        await registerPage.assertPasswordErrorIsVisible();
    });

    test('registration shows error for already used email', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.fill({ name: 'Alice', email: existingUser.email, password: 'somepassword' });
        await registerPage.submit();

        await registerPage.assertEmailAlreadyInUseErrorIsVisible();
    });

    test('successful registration creates an account and redirects to login page', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const uniqueEmail = `user${Date.now()}@example.com`;

        await registerPage.fill({ name: 'New User', email: uniqueEmail, password: 'securepassword' });
        await registerPage.submit();
        await registerPage.assertRegistrationSuccess();

        const loginPage = new LoginPage(page);
        await loginPage.assertLoginFormIsVisible();
    });

    test('newly registered user can log in immediately after registration', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const user = {
            name: 'New User',
            email: `user${Date.now()}@example.com`,
            password: 'securepassword'
        };

        await registerPage.fill(user);
        await registerPage.submit();
        await registerPage.assertRegistrationSuccess();

        const loginPage = new LoginPage(page);
        await loginPage.open();

        await loginPage.fill({ email: user.email, password: user.password });
        await loginPage.submit();

        await loginPage.assertLoginSuccess();
    });
});
