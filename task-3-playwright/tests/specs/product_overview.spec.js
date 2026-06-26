import { test, expect } from "../fixtures/pages.fixture";
import { SignInPage } from "../../pages/sign_in.page";
import { HomePage } from "../../pages/home.page";
import { routes, users } from "../data/index";

test.describe("product overview", () => {
  test("should navigate to product detail when card is clicked", async ({
    page,
    homePage,
  }) => {
    const productCardId = await homePage.getCardId(3);
    await homePage.clickCard(productCardId);

    await expect(page).toHaveURL(`/product/${productCardId}`);
  });
  test("should navigate between pages of products", async ({
    page,
    homePage,
  }) => {
    const page1Ids = await homePage.getAllCardIds();
    await homePage.goToNextPage();
    const page2Ids = await homePage.getAllCardIds();

    await expect(page2Ids).not.toEqual(page1Ids);
  });
});
