import BasePage from "./base.page.js";
import { routes } from "../../data/routes.js";

class ProfilePage extends BasePage {
  constructor() {
    super(routes.profile);
  }

  async open() {
    await super.open();
    await this.waitForPageToLoad();
  }

  async waitForPageToLoad() {
    await browser.waitUntil(
      async () => {
        const emailValue = await this.emailInput.getValue();
        return emailValue && emailValue.length > 0;
      },
      {
        timeout: 5000,
        timeoutMsg: "Profile data did not load in 5 seconds",
      },
    );
  }

  get firstNameInput() {
    return $("#first_name");
  }
  get lastNameInput() {
    return $("#last_name");
  }

  get emailInput() {
    return $("#email");
  }

  get phoneInput() {
    return $("#phone");
  }

  get streetInput() {
    return $("#street");
  }

  get postalCodeInput() {
    return $("#postal_code");
  }

  get cityInput() {
    return $("#city");
  }

  get stateInput() {
    return $("#state");
  }

  get countryInput() {
    return $("#country");
  }

  get currentPasswordInput() {
    return $("#current-password");
  }
  get newPasswordInput() {
    return $("#new-password");
  }
  get confirmPasswordInput() {
    return $("#new-password-confirm");
  }
  get changePasswordBtn() {
    return $("button[data-test='change-password-submit']");
  }

  get successMessage() {
    return $('.toast-success, [data-test="password-change-success"]');
  }
  get errorMessage() {
    return $("div[role='alert']");
  }

  async getProfileInfo() {
    return {
      firstName: await this.firstNameInput.getValue(),
      lastName: await this.lastNameInput.getValue(),
      email: await this.emailInput.getValue(),
      phone: await this.phoneInput.getValue(),
      street: await this.streetInput.getValue(),
      postalCode: await this.postalCodeInput.getValue(),
      city: await this.cityInput.getValue(),
      state: await this.stateInput.getValue(),
      country: await this.countryInput.getValue(),
    };
  }

  async changePassword(currentPassword, newPassword) {
    await this.currentPasswordInput.setValue(currentPassword);
    await this.newPasswordInput.setValue(newPassword);
    await this.confirmPasswordInput.setValue(newPassword);
    await this.changePasswordBtn.click();
  }

  async getSuccessMessage() {
    await this.successMessage.waitForDisplayed({ timeout: 5000 });
    return this.successMessage.getText();
  }

  async getErrorMessage() {
    await this.errorMessage.waitForDisplayed({ timeout: 5000 });
    return this.errorMessage.getText();
  }
}

export default new ProfilePage();
