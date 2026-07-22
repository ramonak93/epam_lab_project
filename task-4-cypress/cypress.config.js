import { defineConfig } from "cypress";

export default defineConfig({
	allowCypressEnv: false,
	defaultBrowser: "firefox",

	e2e: {
		baseUrl: "https://practicesoftwaretesting.com",
		etupNodeEvents(on) {
			on("before:browser:launch", (browser, launchOptions) => {
				if (browser.family === "chromium") {
					launchOptions.args.push(
						"--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
					);
				}

				return launchOptions;
			});
		},
	},
});
