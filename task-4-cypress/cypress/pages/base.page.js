class BasePage {
	constructor(url) {
		this.url = url;
	}

	open() {
		cy.visit(`https://practicesoftwaretesting.com${this.url}`)
	}
}

export default BasePage;
