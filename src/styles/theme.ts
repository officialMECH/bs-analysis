import { defineSemanticTokens } from "@pandacss/dev";

export const semanticTokens = defineSemanticTokens({
	colors: {
		background: { value: { base: "{colors.zinc.100}", _osDark: "{colors.zinc.900}" } },
		container: { value: { base: "{colors.zinc.200}", _osDark: "{colors.zinc.800}" } },
		element: { value: { base: "{colors.zinc.300}", _osDark: "{colors.zinc.700}" } },
		text: { value: { base: "{colors.zinc.900}", _osDark: "{colors.zinc.100}" } },
		subtext: { value: { base: "{colors.zinc.600}", _osDark: "{colors.zinc.400}" } },
		neutral: { value: { base: "{colors.zinc.500}" } },
		light: { value: { base: "{colors.zinc.800}", _osDark: "{colors.zinc.200}" } },
		primary: { value: { base: "{colors.blue.500}" } },
		danger: { value: { base: "{colors.red.600}" } },
		link: { value: { base: "{colors.indigo.500}" } },
		difficulty: {
			["Easy"]: { value: { base: "{colors.green.200}", _osDark: "{colors.green.800}" } },
			["Normal"]: { value: { base: "{colors.yellow.200}", _osDark: "{colors.yellow.800}" } },
			["Hard"]: { value: { base: "{colors.orange.200}", _osDark: "{colors.orange.800}" } },
			["Expert"]: { value: { base: "{colors.red.200}", _osDark: "{colors.red.800}" } },
			["ExpertPlus"]: { value: { base: "{colors.purple.200}", _osDark: "{colors.purple.800}" } },
		},
	},
});
