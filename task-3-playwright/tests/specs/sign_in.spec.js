import { test, expect } from "../fixtures/pages.fixture.js";
import { routes, users } from "../../data/index.js";

test.describe("Sign in", () => {
	test("successfully signs in as admin with valid credentials", async ({ page, signInPage }) => {
		await signInPage.login(users.admin.email, users.admin.password);

		await expect(page).toHaveURL(routes.adminDashboard);
	});

	test("fails to sign user in with invalid credentials", async ({ page, signInPage }) => {
		await signInPage.login(users.invalidCredentials.email, users.invalidCredentials.password);

		await expect(page).toHaveURL(routes.login);
	});
});
