import { definePreset } from "@pandacss/dev";
import { conditions, globalCss } from "./base";
import * as patterns from "./patterns";
import { semanticTokens } from "./theme";
import * as utilities from "./utilities";

export default definePreset({
	globalCss: globalCss,
	conditions: conditions,
	theme: {
		extend: {
			breakpoints: { xs: "480px" },
			semanticTokens: semanticTokens,
		},
	},
	patterns: patterns,
	utilities: utilities,
});
