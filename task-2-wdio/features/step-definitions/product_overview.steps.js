import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import { homePage, productDetailsPage } from "../../pageobjects/index.js";
import { routes } from "../../data/routes.js";

Given("the product overview is displayed", async function () {
    await homePage.open();
    await homePage.waitForCardsToLoad();
});

When("I click on a product card", async function () {
    this.productId = await homePage.selectRandomProductId();
    await homePage.clickCardByID(this.productId);
});

Then("I am navigated to the product detail page.", async function () {
    await productDetailsPage.waitForRedirect();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(routes.productDetails);
    expect(currentUrl).to.include(this.productId);
});

When("I search for a product by name", async function () {
    this.searchTerm = "Pliers";
    await homePage.searchForProduct(this.searchTerm);
});

Then("only products matching the search term are displayed", async function () {
    const searchCaption = await homePage.searchCaption.getText();
    expect(searchCaption).to.include(this.searchTerm);
});

When("I navigate to the next page", async function () {
    this.previousProductIds = await homePage.getAllCardIds();
    await homePage.goToNextPage();
});

Then("the next set of products is displayed", async function () {
    const currentProductIds = await homePage.getAllCardIds();
    expect(currentProductIds).to.not.deep.equal(this.previousProductIds);
});
