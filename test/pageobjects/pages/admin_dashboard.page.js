import BasePage from "./base.page.js";

class AdminDashboardPage extends BasePage {
  constructor() {
    super("/admin/dashboard");
  }

  get pageTitle() {
    return $("h1[data-test='page-title']");
  }

  async isLoaded() {
    await this.pageTitle.waitForDisplayed({ timeout: 5000 });
    return this.pageTitle.isDisplayed();
  }
}

export { AdminDashboardPage };
