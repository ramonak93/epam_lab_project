/*
 * UC-1 Product Overview testing
 * Practicing EXPECT, SHOULD and ASSERT interfaces of Chai assertion library
 */

import { expect, should, assert } from "chai";
import { users, routes, MAX_ATTEMPTS } from "../../data";
import { homePage, productDetailsPage } from "../../pageobjects/index.js";

should();

describe("product overview", async () => {
  beforeEach(async () => {
    await homePage.open();
  });

  it("should navigate to product detail when product card is clicked", async () => {
    const productId = await homePage.selectRandomProductId();
    await homePage.clickCardByID(productId);
    await productDetailsPage.waitForRedirect();

    expect(await browser.getUrl())
      .to.include(routes.productDetails)
      .and.include(productId);
  });

  it("search for a product by name", async () => {
    const searchTerm = "Pliers";
    await homePage.searchForProduct(searchTerm);
    const searchresultCaption = await homePage.searchCaption.getText();

    searchresultCaption.should.include(searchTerm);
  });

  it("navigate between pages of products", async () => {
    const page1Ids = await homePage.getAllCardIds();
    await homePage.nextPageBtn.click();
    const page2Ids = await homePage.getAllCardIds();

    assert.notEqual(page1Ids, page2Ids);
  });
});
