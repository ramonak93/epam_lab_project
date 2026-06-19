/*
 * UC-2 User Profile Validation (Positive and Negative Testing)
 * Practicing EXPECT, SHOULD and ASSERT interfaces of Chai assertion library
 */

import { expect, should, assert } from "chai";
import { SignInPage, AccountPage, ProfilePage } from "../pageobjects";
import { clearBrowserState } from "../helpers/browser.helper.js";
import { users, routes } from "../data";

should();

describe("user profile information", async () => {
  beforeEach(async () => {
    await clearBrowserState();
    await SignInPage.open();
    await SignInPage.login(users.validUser_1.email, users.validUser_1.password);
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(routes.account),
      {
        timeout: 5000,
        timeoutMsg: `Did not redirect to ${routes.account}`,
      },
    );
  });

  it("should display user's saved personal information", async () => {
    await ProfilePage.open();

    const profileInfo = await ProfilePage.getProfileInfo();
    expect(profileInfo).to.be.an("object");
    expect(profileInfo).to.have.all.keys(
      "firstName",
      "lastName",
      "email",
      "phone",
      "street",
      "postalCode",
      "city",
      "state",
      "country",
    );

    expect(profileInfo.firstName).to.equal(users.validUser_1.firstName);
    expect(profileInfo.lastNameName).to.equal(users.validUser_1.lastNameName);
    expect(profileInfo.email).to.equal(users.validUser_1.email);
    expect(profileInfo.phone).to.equal(users.validUser_1.phone);
    expect(profileInfo.street).to.equal(users.validUser_1.street);
    expect(profileInfo.postalCode).to.equal(users.validUser_1.postalCode);
    expect(profileInfo.city).to.equal(users.validUser_1.city);
    expect(profileInfo.state).to.equal(users.validUser_1.state);
    expect(profileInfo.country).to.equal(users.validUser_1.country);
  });
});

describe.only("Changing password", async () => {
  beforeEach(async () => {
    await clearBrowserState();
    await SignInPage.open();
    await SignInPage.login(users.validUser_3.email, users.validUser_3.password);
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(routes.account),
      {
        timeout: 5000,
        timeoutMsg: `Did not redirect to ${routes.account}`,
      },
    );

    await ProfilePage.open();
  });

  const originalPassword = users.validUser_3.password;
  const newPassword = users.passwordChange.newPassword;
  afterEach(async () => {
    try {
      await SignInPage.open();
      await SignInPage.login(users.validUser_3.email, newPassword);
      await AccountPage.open();
      await ProfilePage.open();
      await ProfilePage.changePassword(newPassword, originalPassword);
    } catch (error) {
      console.warn("Could not reset password:", error.message);
    }
  });

  it("Should notify the user that the password has been changed", async () => {
    await ProfilePage.changePassword(originalPassword, newPassword);
    const successMessage = await ProfilePage.getSuccessMessage();
    console.log("the success message is: " + successMessage);
    successMessage.should.be.a("string").and.not.be.empty;
    SignInPage.isLoaded().should.be.true;
    // successMessage.toLowerCase().should.include("successfully");
  });

  //it("Should require the new password for future sign in", async () => {});

  //it("fails to change the password with incorrect current password", async () => {});
});
