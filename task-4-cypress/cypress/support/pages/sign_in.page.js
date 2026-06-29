import { BasePage } from "./base.page";
import { routes } from "../data/routes";

class SignInPage extends BasePage {
  constructor() {
    super(routes.login);
  }
}

export default SignInPage;
