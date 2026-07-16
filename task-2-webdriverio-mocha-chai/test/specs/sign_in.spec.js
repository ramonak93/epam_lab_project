/*
 * UC-1 Sign in Validation (Positive andNegative Testing)
 * Practicing EXPECT, SHOULD and ASSERT interfaces of Chai assertion library
 */

import { expect, should, assert } from "chai";
import {
  signInPage,
  accountPage,
  adminDashboardPage,
  productDetailsPage,
} from "../../pageobjects";
import { users, routes, MAX_ATTEMPTS } from "../../data";

should();

describe("Sign In", async () => {
  beforeEach(async () => {
    await signInPage.open();
  });

  it("successfully signs in as user with valid credentials", async () => {
    await signInPage.login(users.validUser_1.email, users.validUser_1.password);
    await accountPage.waitForRedirect();

    expect(await accountPage.isLoaded()).to.be.true;
  });

  it("successfully signs in as admin with valid credentials", async () => {
    await signInPage.login(users.admin.email, users.admin.password);
    await adminDashboardPage.waitForRedirect();

    expect(await adminDashboardPage.isLoaded()).to.be.true;
  });

  it("fails to sign user in with missing credentials", async () => {
    await signInPage.login("", "");

    const currrentUrl = await browser.getUrl();
    currrentUrl.should.include(routes.login);

    await signInPage.emailError.waitForDisplayed({ timeout: 5000 });
    const emailErrorDisplayed = await signInPage.emailError.isDisplayed();
    const passwordErrorDisplayed = await signInPage.passwordError.isDisplayed();
    const emailErrorText = await signInPage.emailError.getText();
    const passwordErrorText = await signInPage.passwordError.getText();

    emailErrorDisplayed.should.be.true;
    emailErrorText.should.include("Email");
    passwordErrorDisplayed.should.be.true;
    passwordErrorText.should.have.string("Password");
  });

  it("fails to sign user in with invalid credentials", async () => {
    await signInPage.login(
      users.invalidCredentials.email,
      users.invalidCredentials.password,
    );
    await signInPage.loginError.waitForDisplayed({ timeout: 5000 });

    const currrentUrl = await browser.getUrl();
    const loginErrorDisplayed = await signInPage.loginError.isDisplayed();
    const loginErrorText = await signInPage.loginError.getText();

    currrentUrl.should.include(routes.login);
    loginErrorDisplayed.should.be.true;
    loginErrorText.should.match(/^(?=.*\bemail\b)(?=.*\bpassword\b).*$/gm);
  });

  // bugged functionality, may lock out after 1 attempt or show wrong user alert
  it("locks out user after multiple failed sign in attempts", async () => {
    for (let i = 1; i <= MAX_ATTEMPTS + 2; i++) {
      await signInPage.login(
        users.lockoutTest.email,
        users.lockoutTest.password,
      );

      await signInPage.loginError.waitForDisplayed({ timeout: 5000 });
    }

    const loginErrorDisplayed = await signInPage.loginError.isDisplayed();
    const loginErrorText = await signInPage.loginError.getText();

    assert.isTrue(
      loginErrorDisplayed,
      "Login error message should be displayed",
    );
    assert.include(
      loginErrorText.toLowerCase(),
      "locked",
      "Login error message should indicate account is blocked",
    );
  });
});
