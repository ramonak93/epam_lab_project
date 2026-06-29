import { BasePage } from "./base.page";
import { routes } from "../data/routes";

class HomePage extends BasePage {
  constructor() {
    super(routes.home);
  }
}

export default HomePage;
