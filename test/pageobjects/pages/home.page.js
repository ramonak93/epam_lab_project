import BasePage from "./base.page.js";
import { routes } from "../../data/routes.js";
import { CARDS_PER_PAGE } from "../../data/constants.js";

class HomePage extends BasePage {
  constructor() {
    super(routes.home);
  }

  get productCards() {
    return $$('.card[data-test^="product-"]');
  }

  async selectRandomProductId() {
    const randomIndex = Math.floor(Math.random() * CARDS_PER_PAGE);
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
}

export default new HomePage();
