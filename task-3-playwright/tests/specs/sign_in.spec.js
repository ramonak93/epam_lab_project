import { test, expect } from "../fixtures/pages.fixture.js";
import { SignInPage } from "../../pages/sign_in.page.js";
import { routes, users } from "../data/index";

test.describe("sign in", () => {
  // let signInPage;

  // test.beforeEach(async ({ page }) => {
  //   signInPage = new SignInPage(page);
  //   await signInPage.open();
  // });

  test("successfully signs in as admin with valid credentials", async ({
    page,
    signInPage,
  }) => {
    await signInPage.login(users.admin.email, users.admin.password);

    await expect(page).toHaveURL(routes.adminDashboard);
  });
  test("fails to sign user in with invalid credentials", async ({
    page,
    signInPage,
  }) => {
    await signInPage.login(
      users.invalidCredentials.email,
      users.invalidCredentials.password,
    );

    await expect(page).toHaveURL(routes.login);
  });
});
