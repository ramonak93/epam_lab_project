import HomePage from "../pages/home.page";

const homePage = new HomePage();

describe("product overview", () => {
	it("should search for a product by name", () => {
		homePage.open();
		const term = "Pliers";
		homePage.search(term);
		homePage.searchCaption.should("include.text", term);
	});
});
