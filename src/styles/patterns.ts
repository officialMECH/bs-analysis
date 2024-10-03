import { definePattern } from "@pandacss/dev";

export const interactable = definePattern({
	transform: ({ ...rest }) => {
		return {
			backgroundColor: rest.backgroundColor ?? "element",
			color: "text",
			border: rest.border ?? "1px solid transparent",
			transition: "border-color 0.25s",
			cursor: "pointer",
			WebkitAppearance: "none",
			_on: {
				backgroundColor: "primary",
			},
			_hover: {
				borderColor: "primary",
			},
			_disabled: {
				backgroundColor: "container",
				color: "subtext",
				cursor: "not-allowed",
				"& > *": {
					cursor: "not-allowed",
				},
			},
			...rest,
		};
	},
});

export const scrollable = definePattern({
	description: "A container that allows for scrolling",
	properties: {
		// The direction of the scroll
		direction: { type: "enum", value: ["horizontal", "vertical", "both"] },
		// Whether to hide the scrollbar
		hideScrollbar: { type: "boolean" },
	},
	// disallow the `overflow` property (in TypeScript)
	blocklist: ["overflow"],
	transform(props: Partial<{ direction: "horizontal" | "vertical"; hideScrollbar: boolean }>) {
		const { direction, hideScrollbar, ...rest } = props;
		return {
			overflowX: direction !== "vertical" ? "auto" : "hidden",
			overflowY: direction !== "horizontal" ? "auto" : "hidden",
			height: direction !== "vertical" ? "full" : "auto",
			width: direction !== "horizontal" ? "full" : "auto",
			scrollbarWidth: hideScrollbar ? "none" : "auto",
			hideWebkit: hideScrollbar,
			...rest,
		};
	},
});
