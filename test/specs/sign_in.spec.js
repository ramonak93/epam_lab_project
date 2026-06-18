/*
 * UC-1 Sign in Validation (Positive andNegative Testing)
 * Practicing EXPECT SHOULD and ASSERT interfaces of Chai assertion library
 */

import { expect } from "chai";
import { should } from "chai";
import { assert } from "chai";
import {
  SignInPage,
  UserProfilePage,
  UserAccountPage,
  AdminDashboardPage,
} from "../pageobjects";
import { clearBrowserState } from "../helpers/browser.helper.js";
import { users, routes, MAX_ATTEMPTS } from "../data";

should();

const signInPage = new SignInPage();
const userProfilePage = new UserProfilePage();
const userAccountPage = new UserAccountPage();
const adminDashboardPage = new AdminDashboardPage();

describe("Sign In", async () => {
  beforeEach(async () => {
    await clearBrowserState();
    await signInPage.open();
  });

  // this may fail, it is a known UI bug #21 (User will be locked after 1 invalid attempt (should be 3))
  it("successfully signs in as user with valid credentials", async () => {
    await signInPage.login(users.validUser.email, users.validUser.password);

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(routes.account),
      {
        timeout: 5000,
        timeoutMsg: `Did not redirect to ${routes.account}`,
      },
    );
    expect(await browser.getUrl()).to.include(routes.account);

    expect(await userAccountPage.isLoaded()).to.be.true;
  });

  it("successfully signs in as admin with valid credentials", async () => {
    await signInPage.login(users.admin.email, users.admin.password);

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(routes.adminDashboard),
      {
        timeout: 5000,
        timeoutMsg: `Did not redirect to ${routes.adminDashboard}`,
      },
    );
    expect(await browser.getUrl()).to.include(routes.adminDashboard);

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

    const currrentUrl = await browser.getUrl();
    currrentUrl.should.include(routes.login);

    await signInPage.loginError.waitForDisplayed({ timeout: 5000 });
    const loginErrorDisplayed = await signInPage.loginError.isDisplayed();
    const loginErrorText = await signInPage.loginError.getText();

    loginErrorDisplayed.should.be.true;
    loginErrorText.should.match(/^(?=.*\bemail\b)(?=.*\bpassword\b).*$/gm);
  });

  it("locks out user after multiple failed sign in attempts", async () => {
    for (let i = 1; i <= MAX_ATTEMPTS + 2; i++) {
      await signInPage.login(
        users.lockoutTest.email,
        users.lockoutTest.password,
      );

      await signInPage.loginError.waitForDisplayed({ timeout: 10000 });
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
