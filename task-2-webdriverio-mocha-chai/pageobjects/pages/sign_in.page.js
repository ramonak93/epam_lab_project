import BasePage from "./base.page.js";
import { routes } from "../../data/routes.js";

class SignInPage extends BasePage {
	constructor() {
		super(routes.login);
	}

	async open() {
		await super.open();

		await browser.execute(() => {
			localStorage.clear();
			sessionStorage.clear();
		});
	}

	get emailInput() {
		return $("#email");
	}

	get passwordInput() {
		return $("#password");
	}

	get signInButton() {
		return $("input[value='Login']");
	}

	get emailError() {
		return $("#email-error");
	}

	get passwordError() {
		return $("#password-error");
	}

	get loginError() {
		return $("div[data-test='login-error']");
	}

	async login(email, password) {
		const myEmailInput = await $("#email");
		const myPasswordInput = await("#password");
		await this.emailInput.waitForDisplayed({timeout: 10000});
		console.log('Current URL:', await browser.getUrl());
		console.log('Page title:', await browser.getTitle());
		console.log('Email exists:', await myEmailInput.isExisting());
		console.log('Email displayed:', await myPasswordInput.isDisplayed());
		await myEmailInput.setValue(email);
		await myPasswordInput.setValue(password);
		await this.signInButton.click();
	}

	async isLoaded() {
		return this.signInButton.isDisplayed();
	}
}

export default new SignInPage();
