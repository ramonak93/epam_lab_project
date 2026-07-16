import BasePage from "./base.page";
import { routes } from "../data/routes";

class HomePage extends BasePage {
  constructor() {
    super(routes.home);
  }

  get searchQuery() {
    return cy.get('[data-test="search-query"]');
  }

  get searchButton() {
    return cy.get('[data-test="search-submit"]');
  }

  get searchreset() {
    return cy.get('[data-test="search-submit"]');
  }

  get searchCaption() {
    return cy.get('[data-test="search-caption"]');
  }

  search(productname) {
    this.searchreset.click();
    this.searchQuery.type(productname);
    this.searchButton.click();
  }
}

export default HomePage;
