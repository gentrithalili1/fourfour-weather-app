import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const booleanPrefix = ["is", "should", "has", "can"];

export default defineConfig([
	globalIgnores(["dist", "node_modules", ".wrangler", "./worker-configuration.d.ts"]),
	{
		files: ["**/*.{ts,tsx}"],
		ignores: ["dist", "node_modules", ".wrangler"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
			globals: globals.browser,
			parserOptions: {
				project: [
					"./tsconfig.app.json",
					"./tsconfig.node.json",
					"./tsconfig.worker.json",
					"./tsconfig.e2e.json",
				],
			},
		},
		rules: {
			"no-await-in-loop": "warn",
			"no-eval": "error",
			"no-var": "error",
			"no-implied-eval": "error",
			"prefer-promise-reject-errors": "warn",
			"no-shadow": "off",
			"no-empty-function": "off",
			"no-unused-vars": "off",
			"no-use-before-define": "off",
			"no-console": "error",
			"arrow-body-style": "off",
			"no-duplicate-imports": "error",
			"@typescript-eslint/no-empty-function": "error",
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-use-before-define": ["off"],
			"@typescript-eslint/no-shadow": ["error"],
			"@typescript-eslint/no-duplicate-enum-values": "error",
			"@typescript-eslint/no-empty-interface": "error",
			"react-refresh/only-export-components": "off",
			"react-hooks/set-state-in-effect": "off",
			// turning off for now, it's too strict, but I prefer to have it on!
			// "@typescript-eslint/naming-convention": [
			// 	"error",
			// 	{
			// 		selector: "variable",
			// 		types: ["boolean"],
			// 		format: ["PascalCase"],
			// 		prefix: booleanPrefix,
			// 	},
			// 	{
			// 		selector: "typeProperty",
			// 		types: ["boolean"],
			// 		format: ["PascalCase"],
			// 		prefix: booleanPrefix,
			// 	},
			// 	{
			// 		selector: "parameter",
			// 		types: ["boolean"],
			// 		format: ["PascalCase"],
			// 		prefix: booleanPrefix,
			// 	},
			// ],
		},
	},
]);
