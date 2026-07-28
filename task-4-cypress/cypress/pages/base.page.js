class BasePage {
	constructor(url) {
		this.url = url;
	}

	open() {
		cy.visit((this.url), {
			headers: {
				"Accept" : "application/json, text/plain, */*",
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36"
			}
		})
	}
}

export default BasePage;
