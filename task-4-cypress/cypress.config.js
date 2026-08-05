import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
  allowCypressEnv: false,
  defaultBrowser: "firefox",

	e2e: {
		baseUrl: "https://practicesoftwaretesting.com",
		screenshotOnRunFailure: true,
	},
});
