/*
 * UC-1 Sign in Validation (Positive andNegative Testing)
 * Practicing EXPECT, SHOULD and ASSERT interfaces of Chai assertion library
 */

import { expect, should, assert } from "chai";
import { HomePage, ProductDetailPage } from "../pageobjects";
import { clearBrowserState, waitForRedirect } from "../helpers";
import { users, routes, MAX_ATTEMPTS } from "../data";
import homePage from "../pageobjects/pages/home.page";

should();

describe("product overview", async () => {
  beforeEach(async () => {
    await clearBrowserState();
    await HomePage.open();
  });

  it("should navigate to product detail when product card is clicked", async () => {
    const productId = await HomePage.selectRandomProductId();
    await HomePage.clickRandomCard(productId);
    await waitForRedirect(routes.productDetails);
    expect(await browser.getUrl())
      .to.include(routes.productDetails)
      .and.include(productId);
  });
  it("search for a product by name", async () => {});
  it("navigate between pages of products", async () => {});
});
