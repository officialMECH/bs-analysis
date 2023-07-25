import { IData } from "$/types";
import { importDuration } from "./duration.helpers";

const HJD_START = 4;
const HJD_MIN = 0.25;
const HJ_MAX = 17.999;

export function nps({ colorNotes, length }: Pick<IData, "colorNotes" | "length">) {
	if (!colorNotes || !length) return undefined;
	return colorNotes.total / importDuration(length.toString());
}

export function hjd({ bpm, jumpSpeed, jumpOffset }: Pick<IData, "bpm" | "jumpSpeed" | "jumpOffset">) {
	if (!bpm || !jumpSpeed) return undefined;
	const num = 60 / bpm;
	let hjd = HJD_START;
	while (jumpSpeed * num * hjd > HJ_MAX) hjd /= 2;
	if (hjd < 1) hjd = 1;
	return Math.max(hjd + (jumpOffset ?? 0), HJD_MIN);
}

export function jd({ bpm, jumpSpeed, jumpOffset }: Pick<IData, "bpm" | "jumpSpeed" | "jumpOffset">) {
	if (!bpm || !jumpSpeed) return undefined;
	return jumpSpeed * (60 / bpm) * hjd({ bpm, jumpSpeed, jumpOffset })! * 2;
}

export function rt({ bpm, jumpSpeed, jumpOffset }: Pick<IData, "bpm" | "jumpSpeed" | "jumpOffset">) {
	if (!bpm || !jumpSpeed) return undefined;
	return (60 / bpm) * hjd({ bpm, jumpSpeed, jumpOffset })!;
}
