import { defineConfig } from "cypress";

export default defineConfig({
	allowCypressEnv: false,
	defaultBrowser: "firefox",

	e2e: {
		baseUrl: "https://practicesoftwaretesting.com",
		screenshotOnRunFailure: true,
		setupNodeEvents(on) {
			on("before:browser:launch", (browser, launchOptions) => {
				if (browser.family === "chromium") {
					launchOptions.args.push(
						"--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
					);
				}
				if (browser.family === "firefox") {
					launchOptions.preferences["general.useragent.override"] =
						"Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0";
				}
				return launchOptions;
			});
		},
	},
});
