import BasePage from "./base.page.js";
import { routes } from "../../data/routes.js";
import { CARDS_PER_PAGE } from "../../data/constants.js";

class HomePage extends BasePage {
  constructor() {
    super(routes.home);
  }

  get searchQueryInput() {
    return $("#search-query");
  }

  get searchBtn() {
    return $('[data-test="search-submit"]');
  }

  get searchCaption() {
    return $('[data-test="search-caption"]');
  }

  get productCards() {
    return $$('.card[data-test^="product-"]');
  }

  async searchForProduct(productName) {
    await this.searchQueryInput.setValue(productName);
    await this.searchBtn.click();

    await browser.waitUntil(async () => (await this.productCards).length >= 0, {
      timeout: 5000,
      timeoutMsg: "Search results did not load",
    });
  }

  async selectRandomProductId() {
    const randomIndex = Math.floor(Math.random() * CARDS_PER_PAGE + 1);
    console.log("rand int: " + randomIndex);
    const myButton = await $(
      `.card[data-test^='product-']:nth-child(${randomIndex})`,
    );
    const id = await myButton.getAttribute("data-test");
    return id.replace("product-", "");
  }

  async clickRandomCard(cardId) {
    const element = await $(`.card[data-test="product-${cardId}"]`);
    try {
      element.click();
    } catch (e) {
      console.warn("Can't click the element: " + e);
    }
  }

  async productName() {}
}

export default new HomePage();
