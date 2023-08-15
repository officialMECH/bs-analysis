import { Difficulty } from "$/types";

export const metadata = {
	title: "Beat Saber Map Analysis",
};

export const colors = {
	accent: "#287ED4",
	error: "#c03030",
	difficulty: {
		Easy: "rgba(34, 139, 34, 0.5)",
		Normal: "rgba(65, 105, 225, 0.5)",
		Hard: "rgba(210, 105, 30, 0.5)",
		Expert: "rgba(165, 42, 42, 0.5)",
		"Expert+": "rgba(102, 51, 153, 0.5)",
	} satisfies Record<Difficulty, string>,
	mapper: {
		mapper: "#3CB371",
		lighter: "#BA55D3",
		hybrid: "#7B68EE",
	},
};
