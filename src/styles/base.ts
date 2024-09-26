import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
	html: {
		backgroundColor: "background",
		color: "text",
		colorScheme: "light dark",
	},
	body: {
		maxWidth: "6xl",
		marginX: "auto",
	},
	// HACK: radix-ui portals do not respect margin/padding values.
	"body[data-scroll-locked]": {
		padding: "0 !important",
		marginX: "auto !important",
	},
	main: {
		margin: 8,
	},
	_focus: {
		borderColor: "white",
	},
	a: {
		padding: 0,
		color: "link",
		transition: "color 0.25s",
		_hover: {
			color: "indigo.400",
		},
	},
	"code, pre": {
		fontFamily: "monospace",
		fontSize: "md",
	},
	hr: {
		marginY: 4,
	},
	"input, select, textarea": {
		paddingY: 0.5,
		paddingX: 1,
		fontSize: "sm",
		fontWeight: "normal",
		_placeholder: {
			fontSize: "xs",
			fontFamily: "system-ui",
		},
	},
	p: {
		marginBottom: 2,
	},
});

export const conditions = {
	hover: "&:not([disabled]):hover",
	on: "&[data-state='on']",
} as const;
