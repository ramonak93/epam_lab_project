import BasePage from "./base.page.js";

class SignInPage extends BasePage {
  constructor() {
    super("/auth/login.html");
  }
}

export { SignInPage };
