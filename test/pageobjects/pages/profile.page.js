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
}

export default new ProfilePage();
