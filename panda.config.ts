import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	preflight: true,
	include: ["./src/**/*.{js,jsx,ts,tsx}"],
	exclude: [],
	outdir: "src/styles",
	globalCss: {
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
		"&:focus": {
			borderColor: "white",
		},
		a: {
			color: "link",
			transition: "color 0.25s",
			"&:hover": {
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
			"&::placeholder": {
				fontSize: "xs",
				fontFamily: "system-ui",
			},
		},
		p: {
			marginBottom: 2,
		},
	},
	theme: {
		extend: {
			breakpoints: {
				xs: "480px",
			},
			semanticTokens: {
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
			},
		},
	},
	patterns: {
		extend: {
			interactable: {
				transform: ({ ...rest }) => {
					return {
						backgroundColor: rest.backgroundColor ?? "element",
						color: "text",
						border: rest.border ?? "1px solid transparent",
						transition: "border-color 0.25s",
						cursor: "pointer",
						WebkitAppearance: "none",
						['&[data-state="on"]']: {
							backgroundColor: "primary",
						},
						"&:not([disabled]):hover": {
							borderColor: "primary",
						},
						"&[disabled]": {
							backgroundColor: "container",
							color: "subtext",
							cursor: "not-allowed",
						},
						"&[disabled] > *": {
							cursor: "not-allowed",
						},
						...rest,
					};
				},
			},
			scrollable: {
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
			},
		},
	},
	utilities: {
		extend: {
			hideWebkit: {
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
			},
		},
	},
});
