import { Difficulty } from "$/types";

export const metadata = {
	title: "Beat Saber Map Analysis",
};

export const colors = {
	neutral: (opacity = 1) => `hsla(0, 0%, 50%, ${opacity})`,
	accent: "#287ED4",
	error: "#c03030",
	difficulty: (opacity = 1) => {
		return {
			Easy: `rgba(34, 139, 34, ${opacity})`,
			Normal: `rgba(65, 105, 225, ${opacity})`,
			Hard: `rgba(210, 105, 30, ${opacity})`,
			Expert: `rgba(165, 42, 42, ${opacity})`,
			"Expert+": `rgba(102, 51, 153, ${opacity})`,
		} satisfies Record<Difficulty, string>;
	},
	mapper: {
		mapper: "#3CB371",
		lighter: "#BA55D3",
		hybrid: "#7B68EE",
	},
};
