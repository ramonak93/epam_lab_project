import BasePage from "./base.page.js";
import { routes } from "../../data/routes.js";

class SignInPage extends BasePage {
  constructor() {
    super(routes.login);
  }

  async open() {
    await super.open();
    await this.waitForPageToLoad();
  }

  get emailInput() {
    return $("#email");
  }

  get passwordInput() {
    return $("#password");
  }

  get signInButton() {
    return $("input[value='Login']");
  }

  get emailError() {
    return $("#email-error");
  }

  get passwordError() {
    return $("#password-error");
  }

  get loginError() {
    return $("div[data-test='login-error']");
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.signInButton.click();
  }

  async isLoaded() {
    return this.signInButton.isDisplayed();
  }
}

export default new SignInPage();
