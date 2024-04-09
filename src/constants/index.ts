import { IDataset } from "$/types";

export * as fields from "./fields";

export const metadata = {
	title: "Beat Saber Map Analysis",
	repository: "https://github.com/officialMECH/bs-analysis",
};

export const datasets = import.meta.glob("$/assets/datasets/*.json", { eager: true }) satisfies Record<string, { default: IDataset }>;
