/*
 * UC-2 User Profile Validation (Positive and Negative Testing)
 * Practicing EXPECT, SHOULD and ASSERT interfaces of Chai assertion library
 */

import { expect, should, assert } from "chai";
import { SignInPage, AccountPage, ProfilePage } from "../pageobjects";
import { clearBrowserState } from "../helpers/browser.helper.js";
import { users, routes } from "../data";

should();

describe("user profile", async () => {
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
