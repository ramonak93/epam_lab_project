import { BasePage } from "./base.page";
import { routes } from "../tests/data/index";

export class SignInPage extends BasePage {
  constructor(page) {
    super(page);
    this.route = routes.login;
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.emailError = page.locator("#email-error");
    this.passwordError = page.locator("#password-error");
    this.loginError = page.locator('[data-test="login-error"]');
  }

  async open() {
    await super.open(this.route);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
