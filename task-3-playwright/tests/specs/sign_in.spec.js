import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pages/sign_in.page";
import { routes, users } from "../data/index";

test.describe("sign in", () => {
  test("successfully signs in as admin with valid credentials", async ({
    page,
  }) => {
    // open sign in page
    const signInPage = new SignInPage(page);
    await signInPage.goto(routes.login);

    // inset email and pass
    await signInPage.login(users.admin.email, users.admin.password);
    // validate
    await expect(page).toHaveURL(routes.adminDashboard);
  });
  test("fails to sign user in with invalid credentials", async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.goto(routes.login);

    await signInPage.login(
      users.invalidCredentials.email,
      users.invalidCredentials.password,
    );

    await expect(page).toHaveURL(routes.login);
  });
});
