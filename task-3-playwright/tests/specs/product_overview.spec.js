import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pages/sign_in.page";
import { HomePage } from "../../pages/home.page";
import { routes, users } from "../data/index";

test.describe("product overview", () => {
  test("should navigate to product detail when product card is clicked", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const productCardId = await homePage.getCardId(3);
    await homePage.clickCard(productCardId);

    await expect(page).toHaveURL(`/product/${productCardId}`);
  });
  test("should navigate between pages of products", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const page1Ids = await homePage.getAllCardIds();
    // console.log("page1: " + page1Ids);
    await homePage.goToNextPage();
    const page2Ids = await homePage.getAllCardIds();
    // console.log("page2: " + page2Ids);
    await expect(page2Ids).not.toEqual(page1Ids);
  });
});
