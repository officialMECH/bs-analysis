/// <reference types="vitest" />

import generouted from "@generouted/react-router/plugin";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), generouted()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			$: fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
