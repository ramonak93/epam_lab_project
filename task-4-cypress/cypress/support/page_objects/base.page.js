class BasePage {
  constructor(url) {
    this.url = url;
  }

  open() {
    cy.visit(this.url);
  }
}

export default BasePage;
