import { Characteristic, Difficulty } from "./shared";

type IEntity<T = unknown> = { id: string } & T;
type IStats<T = unknown> = { total: number } & Partial<T>;
type IProperty<K extends string | number, T = unknown> = Record<K, IStats<T>>;

export interface IInfo {
	title: string;
	pack?: string;
	released?: string | number;
	bpm: number;
	length: string | number;
}

export interface ILevel {
	characteristic: string | Characteristic;
	difficulty: Difficulty;
	colorNotes: IStats;
	bombNotes: IStats;
	obstacles: IStats;
	sliders: IStats;
	burstSliders: IStats;
	basicBeatmapEvents: IStats;
	colorBoostBeatmapEvents: IStats;
	rotationEvents: IStats;
	bpmEvents: IStats;
	lightColorEventBoxGroups: IStats;
	lightRotationEventBoxGroups: IStats;
	lightTranslationEventBoxGroups: IStats;
	waypoints: IStats;
	basicEventTypesWithKeywords: IStats;
	jumpSpeed: number;
	jumpOffset: number;
	mappers: string[];
	lighters: string[];
}

export type IData = IEntity<IInfo & ILevel>;
export type IDataset = { name: string | null; data: IData[] };
