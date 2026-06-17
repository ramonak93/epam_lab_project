import BasePage from "./base.page.js";

class SignInPage extends BasePage {
  constructor() {
    super("/auth/login");
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

  async signin(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.signInButton.click();
  }
}

export { SignInPage };
