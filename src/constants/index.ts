export const metadata = {
	title: "Beat Saber Map Analysis",
};

export const datasets = import.meta.glob("$/assets/datasets/*.json", { eager: true });
