import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import playwright from "eslint-plugin-playwright";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
	{
		ignores: ["node_modules/", "playwright-report", "test-results"],
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
		files: ["tests/**"],
		extends: [playwright.configs["flat/recommended"]],
	},

	eslintConfigPrettier,
]);
