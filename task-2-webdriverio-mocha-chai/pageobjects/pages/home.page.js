import BasePage from "./base.page.js";
import { routes } from "../../test/data/routes.js";
import { CARDS_PER_PAGE } from "../../test/data/constants.js";

class HomePage extends BasePage {
  constructor() {
    super(routes.home);
  }

  async open() {
    await super.open();

    await browser.execute(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        /* ignore potential issues if storage is not available */
      }
    });
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

  get nextPageBtn() {
    return $('.page-item .page-link[aria-label="Next"]');
  }

  async waitForCardsToLoad() {
    await browser.waitUntil(
      async () => {
        const cards = await this.productCards;
        return cards.length >= 1;
      },
      {
        timeout: 5000,
        timeoutMsg: `Expected at least 1 product card to load`,
      },
    );
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

  async goToNextPage() {
    const currentFirstId = (await this.getAllCardIds())[0];

    await this.nextPageButton.scrollIntoView();
    await this.nextPageButton.click();

    await browser.waitUntil(
      async () => {
        const cards = await this.productCards;
        if (cards.length === 0) return false;
        const firstDataTest = await cards[0].getAttribute("data-test");
        return firstDataTest !== `product-${currentFirstId}`;
      },
      {
        timeout: 10000,
        timeoutMsg: "Page did not navigate — products did not change",
      },
    );
  }

  async getAllCardIds() {
    await this.waitForCardsToLoad();
    const cards = await this.productCards;

    const ids = [];
    for (const card of cards) {
      const dataTest = await card.getAttribute("data-test");
      ids.push(dataTest.replace("product-", ""));
    }
    return ids;
  }
}

export default new HomePage();
