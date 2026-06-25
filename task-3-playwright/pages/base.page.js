import { test } from "@playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url = "https://practicesoftwaretesting.com") {
    await this.page.goto(url);
  }
}
