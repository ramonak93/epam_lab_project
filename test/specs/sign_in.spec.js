import { SignInPage, UserProfilePage, AccountPage } from "../pageobjects/";
import { expect } from "chai";

const signInPage = new SignInPage();
const userProfilePage = new UserProfilePage();
const accountPage = new AccountPage();

describe("Sign In", async () => {
  beforeEach(async () => {
    await signInPage.open();
  });

  it("User successfully signs in with valid credentials", async () => {
    await signInPage.signin(
      "customer@practicesoftwaretesting.com",
      "welcome01",
    );
    expect(await browser.getTitle()).to.equal(
      "Overview - Practice Software Testing - Toolshop - v5.0",
    );
  });
});
