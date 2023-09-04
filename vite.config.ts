/// <reference types="vitest" />

import generouted from "@generouted/react-router/plugin";
import pandacss from "@pandacss/dev/postcss";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), generouted()],
	base: "/bs-analysis/",
	resolve: {
		alias: {
			$: fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	css: {
		postcss: {
			// @ts-ignore
			plugins: [pandacss({})],
		},
	},
	test: {
		passWithNoTests: true,
	},
});
