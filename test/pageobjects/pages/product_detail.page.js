import BasePage from "./base.page.js";
import { routes } from "../../data/routes.js";

class ProductdetailPage extends BasePage {
  constructor() {
    super(routes.product);
  }
}

export default new ProductdetailPage();
