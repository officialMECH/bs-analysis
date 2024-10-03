import { defineUtility } from "@pandacss/dev";

export const hideWebkit = defineUtility({
	values: { type: "boolean" },
	transform: (value: boolean) => {
		if (!value) return {};
		return {
			"&::-webkit-scrollbar": {
				display: "none",
			},
			"&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
				WebkitAppearance: "none",
			},
		};
	},
});
