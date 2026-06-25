import { test, expect } from "@playwright/test";
import { SignInPage } from "../../pages/sign_in.page";
import { routes, users } from "../data/index";

test.describe("sign in", () => {
  test("successfully signs in as admin with valid credentials", async ({
    page,
  }) => {
    // open sign in page
    const signInPage = new SignInPage(page);
    signInPage.goto(routes.login);

    // inset email and pass
    signInPage.login(users.admin.email, users.admin.password);
    // validate
    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/admin/dashboard",
    );
  });
  test("fails to sign user in with invalid credentials", async ({
    page,
  }) => {});
});
