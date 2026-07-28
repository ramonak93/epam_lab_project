class BasePage {
	constructor(url) {
		this.url = url;
	}

	open() {
		cy.visit((`https://practicesoftwaretesting.com${this.url}`), {
			headers: {
				"Accept" : "application/json, text/plain, */*",
				"User-Agent": "axios/1.18.1"
			}
		})
	}
}

export default BasePage;
