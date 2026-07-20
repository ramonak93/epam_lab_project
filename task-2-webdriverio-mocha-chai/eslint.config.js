import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import mochaPlugin from "eslint-plugin-mocha";
import { configs as wdioConfig } from "eslint-plugin-wdio";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
	{
		ignores: ["node_modules/", "allure-results/", "allure-report/", "reports/", "coverage/"],
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
		files: ["test/**/*.js"],
		...mochaPlugin.configs.recommended,
		rules: {
			"mocha/no-mocha-arrows": "off",
		},
	},

	wdioConfig["flat/recommended"],

	eslintConfigPrettier,
]);
