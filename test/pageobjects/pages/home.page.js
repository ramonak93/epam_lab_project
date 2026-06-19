import BasePage from "./base.page.js";
import { routes } from "../../data/routes.js";

class HomePage extends BasePage {
  constructor() {
    super(routes.home);
  }

  get productCards() {
    return $$("div[data-test='filter_completed']");
  }
}

export default new HomePage();
