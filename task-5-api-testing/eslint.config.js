import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import mochaPlugin from "eslint-plugin-mocha";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
	{
		ignores: ["node_modules/"],
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

	eslintConfigPrettier,
]);
