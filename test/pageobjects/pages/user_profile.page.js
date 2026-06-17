import BasePage from "./base.page.js";

class UserProfilePage extends BasePage {
  constructor() {
    super("/account/profile");
  }
}

export { UserProfilePage };
