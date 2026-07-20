import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import mochaPlugin from "eslint-plugin-mocha";
import { configs as wdioConfig } from "eslint-plugin-wdio";

export default defineConfig([
	{
		ignores: ["node_modules/", "allure-results/", "allure-report/", "reports/", "coverage/"],
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
