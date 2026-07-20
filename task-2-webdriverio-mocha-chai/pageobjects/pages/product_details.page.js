import BasePage from "./base.page.js";
import { routes } from "../../test/data/routes.js";

class ProductDetailsPage extends BasePage {
	constructor() {
		super(routes.productDetails);
	}
}

export default new ProductDetailsPage();
