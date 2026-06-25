class BasePage {
  constructor(url) {
    this.url = url;
  }

  async open() {
    await browser.url(this.url);
  }

  async getTitle() {
    return await browser.getTitle();
  }
}

export default BasePage;
