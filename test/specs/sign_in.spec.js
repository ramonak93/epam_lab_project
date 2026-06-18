/*
 * UC-1 Sign in Validation (Positive andNegative Testing)
 * Practicing EXPECT SHOULD and ASSERT interfaces of Chai assertion library
 */

import {
  SignInPage,
  UserProfilePage,
  UserAccountPage,
  AdminDashboardPage,
} from "../pageobjects/";
import { expect } from "chai";
import { should } from "chai";
import { assert } from "chai";
should();

const signInPage = new SignInPage();
const userProfilePage = new UserProfilePage();
const userAccountPage = new UserAccountPage();
const adminDashboardPage = new AdminDashboardPage();

describe("Sign In", async () => {
  const MAX_ATTEMPTS = 3;

  beforeEach(async () => {
    await signInPage.open();
  });

  afterEach(async () => {
    // Optional: clean up after as well, in case test failed mid-way
    await browser.execute(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await browser.deleteAllCookies();
  });

  it("successfully signs in as user with valid credentials", async () => {
    await signInPage.login("customer@practicesoftwaretesting.com", "welcome01");

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      {
        timeout: 5000,
        timeoutMsg: "Did not redirect to /account",
      },
    );
    expect(await browser.getUrl()).to.include("/account");

    expect(await userAccountPage.isLoaded()).to.be.true;
  });

  it("successfully signs in as admin with valid credentials", async () => {
    await signInPage.login("admin@practicesoftwaretesting.com", "welcome01");

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/admin/dashboard"),
      {
        timeout: 5000,
        timeoutMsg: "Did not redirect to /admin/dashboard",
      },
    );
    expect(await browser.getUrl()).to.include("/admin/dashboard");

    expect(await adminDashboardPage.isLoaded()).to.be.true;
  });

  it("fails to sign user in with missing credentials", async () => {
    await signInPage.login("", "");

    const currrentUrl = await browser.getUrl();
    currrentUrl.should.include("/auth/login");

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
      "customer@practicesoftwaretesting.com",
      "wrongpassword",
    );

    const currrentUrl = await browser.getUrl();
    currrentUrl.should.include("/auth/login");

    await signInPage.loginError.waitForDisplayed({ timeout: 5000 });
    const loginErrorDisplayed = await signInPage.loginError.isDisplayed();
    const loginErrorText = await signInPage.loginError.getText();

    loginErrorDisplayed.should.be.true;
    loginErrorText.should.match(/^(?=.*\bemail\b)(?=.*\bpassword\b).*$/gm);
  });

  it("locks out user after multiple failed sign in attempts", async () => {
    for (let i = 1; i <= MAX_ATTEMPTS + 1; i++) {
      await signInPage.login(
        "customer2@practicesoftwaretesting.com",
        "wrongpassword",
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
      loginErrorText,
      "locked",
      "Login error message should indicate account is blocked",
    );
  });
});
