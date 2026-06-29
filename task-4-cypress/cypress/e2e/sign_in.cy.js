import { routes } from "../support/data/routes";
import { users } from "../support/data/users";
import SignInPage from "../support/page_objects/sign_in.page";

const signInPage = new SignInPage();

describe("Sign in", () => {
  it("should successfully sign in user with valid credentials", () => {
    // cy.visit("");
    signInPage.open();
    signInPage.login(users.validUser_1.email, users.validUser_1.password);

    cy.url().should("include", routes.account);
  });

  it.only("fails to sign in user with missing credentials", () => {
    signInPage.open();
    signInPage.loginButton.click();
    cy.url().should("include", routes.login);

    signInPage.emailError
      .should("be.visible")
      .and("include.text", "Email is required");

    signInPage.passwordError
      .should("be.visible")
      .and("include.text", "Password is required");
  });
  it("lockout user after repeated failed sign in attempts", () => {});
});
