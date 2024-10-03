import { default as app } from "$/styles";
import { defineConfig } from "@pandacss/dev";
import { default as panda } from "@pandacss/preset-panda";

export default defineConfig({
	preflight: true,
	include: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [panda, app],
});
