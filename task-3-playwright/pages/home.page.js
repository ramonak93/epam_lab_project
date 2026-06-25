import { test } from "@playwright/test";
import { BasePage } from "./Base.page";
import { routes } from "../tests/data/routes";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.route = routes.home;
    this.productCards = page.locator('a[data-test^="product-"]');
    this.nextPageButton = page.locator('[data-test="pagination-next"]');
  }

  async goto() {
    await this.page.goto(this.route);
    await this.productCards.first().waitFor({ state: "visible" });
  }

  /**
   * @param {number} [cardNumber=1] - Product Card position (1-9).
   * @returns {Promise<string>} The product ID value
   */
  async getCardId(cardNumber = 1) {
    if (cardNumber < 1 || cardNumber > 9) {
      throw new Error(
        `Card number must be between 1 and 9, got: ${cardNumber}`,
      );
    }

    const card = await this.productCards
      .nth(cardNumber - 1)
      .getAttribute("data-test");

    if (!card) {
      throw new Error(`Card ${cardNumber} has no data-test attribute`);
    }

    return card.replace("product-", "");
  }

  /**
   * @param {string} cardId - The product ID value
   */
  async clickCard(cardId) {
    if (!cardId) {
      throw new Error("cardId is required");
    }

    const card = this.page.locator(`[data-test="product-${cardId}"]`);
    await card.click();
  }

  async getAllCardIds() {
    const dataTests = await this.productCards.evaluateAll((nodes) =>
      nodes.map((n) => n.getAttribute("data-test")),
    );

    return dataTests.map((dt) => dt.replace("product-", ""));
  }

  async goToNextPage() {
    await this.nextPageButton.click();
    // await this.productCards.first().waitFor({ state: "visible" });
    await this.page.waitForTimeout(15000);
  }
}
