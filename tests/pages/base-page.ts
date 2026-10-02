import { expect, Locator, Page } from "@playwright/test";


export class BasePage {
    constructor(protected readonly page: Page) { }

    async assertElementIsVisible(element: Locator) {
        await expect(element).toBeVisible();
    }

    async assertTextIsVisible(text: string) {
        await expect(this.page.getByText(text)).toBeVisible();
    }
}
