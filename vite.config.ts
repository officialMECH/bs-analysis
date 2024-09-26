import generouted from "@generouted/react-router/plugin";
import pandacss from "@pandacss/dev/postcss";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, UserConfig } from "vite";
import { InlineConfig } from "vitest";

interface ExtendedUserConfig extends UserConfig {
	test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react({ include: ["$/src/templates"] }), generouted({ format: false })],
	resolve: {
		alias: {
			$: fileURLToPath(new URL("./src", import.meta.url)),
			"styled-system": fileURLToPath(new URL("./styled-system", import.meta.url)),
		},
	},
	build: {
		target: "esnext",
	},
	css: {
		postcss: {
			plugins: [pandacss({})],
		},
	},
	test: {
		passWithNoTests: true,
	},
} as ExtendedUserConfig);
