import BasePage from "./base.page.js";
import { routes } from "../data/routes.js";

class SignInPage extends BasePage {
  constructor() {
    super(routes.login);
  }

  get emailInput() {
    return cy.get('[data-test="email"]');
  }
  get passwordInput() {
    return cy.get('[data-test="password"]');
  }
  get loginButton() {
    return cy.get('[data-test="login-submit"]');
  }
  get emailError() {
    return cy.get('[data-test="email-error"]');
  }
  get passwordError() {
    return cy.get('[data-test="password-error"]');
  }

  get loginError() {
    return cy.get('[data-test="login-error"]');
  }

  login(email, password) {
    this.emailInput.clear().type(email);
    this.passwordInput.clear().type(password);
    this.loginButton.click();
  }
}

export default SignInPage;
