import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginCypress from "eslint-plugin-cypress";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
	{
		ignores: ["node_modules/", "cypress/reports/", "cypress/screenshots/", "cypress/downloads/"],
	},

	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},

	js.configs.recommended,

	{
		files: ["cypress/**/*.js", "cypress.config.js"],
		extends: [pluginCypress.configs.recommended],
	},

	eslintConfigPrettier,
]);
