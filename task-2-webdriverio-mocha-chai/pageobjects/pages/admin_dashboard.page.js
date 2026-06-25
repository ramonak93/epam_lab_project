import BasePage from "./base.page.js";
import { routes } from "../../test/data/routes.js";

class AdminDashboardPage extends BasePage {
  constructor() {
    super(routes.adminDashboard);
  }

  get pageTitle() {
    return $("h1[data-test='page-title']");
  }

  async isLoaded() {
    await this.pageTitle.waitForDisplayed({ timeout: 5000 });
    return this.pageTitle.isDisplayed();
  }
}

export default new AdminDashboardPage();
