import { test as base } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { SignInPage } from "../../pages/sign_in.page";

export const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await use(homePage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await signInPage.open();
    await use(signInPage);
  },
});

export { expect } from "@playwright/test";
