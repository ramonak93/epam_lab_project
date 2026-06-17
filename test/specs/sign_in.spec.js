import {
  SignInPage,
  UserProfilePage,
  UserAccountPage,
  AdminDashboardPage,
} from "../pageobjects/";
import { expect } from "chai";

const signInPage = new SignInPage();
const userProfilePage = new UserProfilePage();
const userAccountPage = new UserAccountPage();
const adminDashboardPage = new AdminDashboardPage();

describe("Sign In", async () => {
  beforeEach(async () => {
    await signInPage.open();
  });

  it("successfully signs in as user with valid credentials", async () => {
    await signInPage.login(
      "customer2@practicesoftwaretesting.com",
      "welcome01",
    );

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      { timeout: 5000, timeoutMsg: "Did not redirect to /account" },
    );
    expect(await browser.getUrl()).to.include("/account");

    expect(await userAccountPage.isLoaded()).to.be.true;
  });

  it("successfully signs in as admin with valid credentials", async () => {
    await signInPage.login("admin@practicesoftwaretesting.com", "welcome01");

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/admin/dashboard"),
      { timeout: 5000, timeoutMsg: "Did not redirect to /admin/dashboard" },
    );
    expect(await browser.getUrl()).to.include("/admin/dashboard");

    expect(await adminDashboardPage.isLoaded()).to.be.true;
  });
});
