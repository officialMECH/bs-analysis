import { Difficulty } from "$/types";

export const metadata = {
	title: "Beat Saber Map Analysis",
};

export const colors = {
	accent: "#4682B4",
	error: "#DC143C",
	difficulty: {
		Easy: "#228B22",
		Normal: "#4169E1",
		Hard: "#D2691E",
		Expert: "#A52A2A",
		"Expert+": "#663399",
	} satisfies Record<Difficulty, string>,
	mapper: {
		mapper: "#3CB371",
		lighter: "#BA55D3",
		hybrid: "#7B68EE",
	},
};
