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

  async waitForRedirect(timeout = 5000) {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(this.url),
      {
        timeout,
        timeoutMsg: `Did not redirect to ${this.url}`,
      },
    );
  }
}

export default BasePage;
