export const metadata = {
	title: "Beat Saber Map Analysis",
	repository: "https://github.com/officialMECH/bs-analysis",
};

export const datasets = import.meta.glob("$/assets/datasets/*.json", { eager: true });
