import { HomePage } from "./home.page";
import { SignInPage } from "./sign_in.page";

export class PageFactory {
  constructor(page) {
    this.page = page;

    this.pages = {
      home: () => new HomePage(this.page),
      signIn: () => new SignInPage(this.page),
    };
  }

  create(pageName) {
    const creator = this.pages[pageName];

    if (!creator) {
      throw new Error(`Unknown page type ${pageName}`);
    }

    return creator();
  }
}
