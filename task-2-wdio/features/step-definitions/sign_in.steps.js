import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import { signInPage, accountPage, adminDashboardPage } from "../../pageobjects/index.js";
import { users } from "../../data/users.js";

Given("the user is on the sign in page", async function () {
	await signInPage.open();
});

Given(
	"a registered user with email {string} and password {string}",
	async function (email, password) {
		this.credentials = { email, password };
	}
);

Given("a registered admin user", async function () {
	this.credentials = {
		email: users.admin.email,
		password: users.admin.password,
	};
});

Given("the credentials {string} and {string}", async function (email, password) {
	this.credentials = {
		email: email,
		password: password,
	};
});

Given("a registered user", async function () {
	this.credentials = {
		email: users.validUser1.email,
		password: users.validUser1.password,
	};
});

When("the user signs in", async function () {
	await signInPage.login(this.credentials.email, this.credentials.password);
});

When("the admin signs in", async function () {
	await signInPage.login(this.credentials.email, this.credentials.password);
});

When("the user attempts to sign in", async function () {
	await signInPage.login(this.credentials.email, this.credentials.password);
});

When(
	"the user attempts to sign in with incorrect credentials {int} times",
	async function (attempts) {
		for (let i = 0; i < attempts + 1; i += 1) {
			await signInPage.login(users.lockoutTest.email, users.lockoutTest.password);
			await signInPage.loginError.waitForDisplayed({ timeout: 5000 });
		}
	}
);

Then("the user is granted access to their account", async function () {
	await accountPage.waitForRedirect();
	expect(await accountPage.isLoaded()).to.be.true;
});

Then("the admin is granted access to the dashboard", async function () {
	await adminDashboardPage.waitForRedirect();
	expect(await adminDashboardPage.isLoaded()).to.be.true;
});

Then("the user is notified that the missing fields are required", async function () {
	const emailErrorDisplayed = await signInPage.emailError.isDisplayed();
	const passwordErrorDisplayed = await signInPage.passwordError.isDisplayed();

	expect(emailErrorDisplayed || passwordErrorDisplayed).to.be.true;

	if (emailErrorDisplayed) {
		expect(await signInPage.emailError.getText()).to.include("Email");
	}

	if (passwordErrorDisplayed) {
		expect(await signInPage.passwordError.getText()).to.include("Password");
	}
});

Then("the user is notified of invalid credentials", async function () {
	await signInPage.loginError.waitForDisplayed({ timeout: 5000 });
	const loginErrorText = await signInPage.loginError.getText();

	expect(await signInPage.loginError.isDisplayed()).to.be.true;
	expect(loginErrorText.toLowerCase()).to.include("email");
	expect(loginErrorText.toLowerCase()).to.include("password");
});

Then("the user's account is locked", async function () {
	await signInPage.loginError.waitForDisplayed({ timeout: 5000 });
	expect(await signInPage.loginError.isDisplayed()).to.be.true;
});

Then("the user is notified that the account is locked", async function () {
	await signInPage.loginError.waitForDisplayed({ timeout: 5000 });
	const loginErrorText = await signInPage.loginError.getText();

	expect(loginErrorText.toLowerCase()).to.include("locked");
});
