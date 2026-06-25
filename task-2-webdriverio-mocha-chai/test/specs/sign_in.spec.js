/*
 * UC-1 Sign in Validation (Positive andNegative Testing)
 * Practicing EXPECT, SHOULD and ASSERT interfaces of Chai assertion library
 */

import { expect, should, assert } from "chai";
import { SignInPage, AccountPage, AdminDashboardPage } from "../pageobjects";
import { clearBrowserState, waitForRedirect } from "../helpers";
import { users, routes, MAX_ATTEMPTS } from "../data";

should();

describe("Sign In", async () => {
  beforeEach(async () => {
    await clearBrowserState();
    await SignInPage.open();
  });

  it("successfully signs in as user with valid credentials", async () => {
    await SignInPage.login(users.validUser_1.email, users.validUser_1.password);
    await waitForRedirect(routes.account);

    expect(await AccountPage.isLoaded()).to.be.true;
  });

  it("successfully signs in as admin with valid credentials", async () => {
    await SignInPage.login(users.admin.email, users.admin.password);
    await waitForRedirect(routes.adminDashboard);

    expect(await AdminDashboardPage.isLoaded()).to.be.true;
  });

  it("fails to sign user in with missing credentials", async () => {
    await SignInPage.login("", "");

    const currrentUrl = await browser.getUrl();
    currrentUrl.should.include(routes.login);

    await SignInPage.emailError.waitForDisplayed({ timeout: 5000 });
    const emailErrorDisplayed = await SignInPage.emailError.isDisplayed();
    const passwordErrorDisplayed = await SignInPage.passwordError.isDisplayed();
    const emailErrorText = await SignInPage.emailError.getText();
    const passwordErrorText = await SignInPage.passwordError.getText();

    emailErrorDisplayed.should.be.true;
    emailErrorText.should.include("Email");
    passwordErrorDisplayed.should.be.true;
    passwordErrorText.should.have.string("Password");
  });

  it("fails to sign user in with invalid credentials", async () => {
    await SignInPage.login(
      users.invalidCredentials.email,
      users.invalidCredentials.password,
    );
    await SignInPage.loginError.waitForDisplayed({ timeout: 5000 });

    const currrentUrl = await browser.getUrl();
    const loginErrorDisplayed = await SignInPage.loginError.isDisplayed();
    const loginErrorText = await SignInPage.loginError.getText();

    currrentUrl.should.include(routes.login);
    loginErrorDisplayed.should.be.true;
    loginErrorText.should.match(/^(?=.*\bemail\b)(?=.*\bpassword\b).*$/gm);
  });

  // bugged functionality, may lock out after 1 attempt or show wrong user alert
  it("locks out user after multiple failed sign in attempts", async () => {
    for (let i = 1; i <= MAX_ATTEMPTS + 2; i++) {
      await SignInPage.login(
        users.lockoutTest.email,
        users.lockoutTest.password,
      );

      await SignInPage.loginError.waitForDisplayed({ timeout: 5000 });
    }

    const loginErrorDisplayed = await SignInPage.loginError.isDisplayed();
    const loginErrorText = await SignInPage.loginError.getText();

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
