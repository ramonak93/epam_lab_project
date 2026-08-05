import { test as base } from "@playwright/test";
import { PageFactory } from "../../pages/page.factory";

export const test = base.extend({
	homePage: async ({ page }, use) => {
		const factory = new PageFactory(page);
		const homePage = factory.create("home");
		await homePage.open();
		await use(homePage);
	},
	signInPage: async ({ page }, use) => {
		const factory = new PageFactory(page);
		const signInPage = factory.create("signIn");
		await signInPage.open();
		await use(signInPage);
	},
});

export { expect } from "@playwright/test";
