import BasePage from "./base.page.js";

class UserAccountPage extends BasePage {
  constructor() {
    super("/account");
  }

  get pageTitle() {
    return $("h1[data-test='page-title']");
  }

  async isLoaded() {
    await this.pageTitle.waitForDisplayed({ timeout: 5000 });
    return this.pageTitle.isDisplayed();
  }
}

export { UserAccountPage };
