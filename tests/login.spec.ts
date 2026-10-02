import { test } from '@playwright/test';
import { LoginPage, type Credentials } from './pages/login-page.js';

const alice: Credentials = {
    email: process.env.USER1_USERNAME!,
    password: process.env.USER1_PASSWORD!
};

test.describe('Logging in', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
    });

    test('homepage contains a login form', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.assertLoginFormIsVisible();
    });

    test('successful login redirects to dashboard', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fill(alice);
        await loginPage.submit();

        await loginPage.assertLoginSuccess();
    });

    test('login email is case-insensitive', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fill({ email: alice.email.toUpperCase(), password: alice.password });
        await loginPage.submit();

        await loginPage.assertLoginSuccess();
    });

    test('login requires email and password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.submit();

        await loginPage.assertEmailInvalid();
        await loginPage.assertPasswordInvalid();
    });

    test('login shows error for invalid email format and short password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fill({ email: 'invalid-email', password: '123' });
        await loginPage.submit();

        await loginPage.assertEmailInvalid();
        await loginPage.assertPasswordInvalid();
    });

    test('login fails with unknown user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fill({ email: 'example@example.com', password: alice.password });
        await loginPage.submit();

        await loginPage.assertLoginFailed();
    });

    test('login fails with wrong password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fill({ email: alice.email, password: alice.password.toUpperCase() });

        await loginPage.submit();
        await loginPage.assertLoginFailed();
    });

    test('unauthenticated user is redirected to login page when accessing dashboard', async ({ page }) => {
        await page.goto('/dashboard'); // should redirect to front page

        await page.waitForURL('/');

        await page.getByText('You must be logged in to enter the dashboard').isVisible();
    });

    test('logged in user can log out and is redirected to login page', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fill(alice);
        await loginPage.submit();
        await loginPage.assertLoginSuccess();

        await page.getByRole('button', { name: 'Logout' }).click();

        await loginPage.assertTextIsVisible('You have been logged out.');
    });
});
