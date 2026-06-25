import BasePage from "./base.page.js";
import { routes } from "../../data/routes.js";

class AccountPage extends BasePage {
  constructor() {
    super(routes.account);
  }

  get pageTitle() {
    return $("h1[data-test='page-title']");
  }

  async isLoaded() {
    await this.pageTitle.waitForDisplayed({ timeout: 5000 });
    return this.pageTitle.isDisplayed();
  }
}

export default new AccountPage();
