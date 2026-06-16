import { SignInPage, UserProfilePage } from "../pageobjects/";
import { expect } from "chai";

const signInPage = new SignInPage();
const userProfilePage = new UserProfilePage();

describe("Sign In", async () => {
  beforeEach(async () => {
    await signInPage.open();
  });

  it("should have the correct title", async () => {
    const title = await browser.getTitle();
    expect(title).to.equal("Practice Software Testing - Toolshop - v5.0");
  });
});
