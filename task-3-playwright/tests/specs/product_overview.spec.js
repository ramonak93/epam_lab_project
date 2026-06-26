import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pages/sign_in.page";
import { HomePage } from "../../pages/home.page";
import { routes, users } from "../data/index";

test.describe("product overview", () => {
  // test.beforeEach(async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   await homePage.open();
  // });

  test("should navigate to product detail when card is clicked", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const productCardId = await homePage.getCardId(3);
    await homePage.clickCard(productCardId);

    await expect(page).toHaveURL(`/product/${productCardId}`);
  });
  test("should navigate between pages of products", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const page1Ids = await homePage.getAllCardIds();
    await homePage.goToNextPage();
    const page2Ids = await homePage.getAllCardIds();

    await expect(page2Ids).not.toEqual(page1Ids);
  });
});
