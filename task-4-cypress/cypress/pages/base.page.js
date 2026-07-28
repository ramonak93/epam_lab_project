class BasePage {
	constructor(url) {
		this.url = url;
	}

	open() {
		cy.visit((`https://practicesoftwaretesting.com${this.url}`), {
			headers: {
				"Accept" : "application/json, text/plain, */*",
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
			}
		})
	}
}

export default BasePage;
