import { IData } from "$/types";
import { importDuration } from "./duration.helpers";

const HJD_START = 4;
const HJD_MIN = 0.25;
const HJ_MAX = 17.999;

export function nps({ colorNotes, length }: Pick<IData, "colorNotes" | "length">) {
	return colorNotes.total / importDuration(length.toString());
}

export function hjd({ bpm, jumpSpeed, jumpOffset }: Pick<IData, "bpm" | "jumpSpeed" | "jumpOffset">) {
	const num = 60 / bpm;
	let hjd = HJD_START;
	while (jumpSpeed * num * hjd > HJ_MAX) hjd /= 2;
	if (hjd < 1) hjd = 1;
	return Math.max(hjd + jumpOffset, HJD_MIN);
}

export function jd({ bpm, jumpSpeed, jumpOffset }: Pick<IData, "bpm" | "jumpSpeed" | "jumpOffset">) {
	return jumpSpeed * (60 / bpm) * hjd({ bpm, jumpSpeed, jumpOffset }) * 2;
}

export function rt({ bpm, jumpSpeed, jumpOffset }: Pick<IData, "bpm" | "jumpSpeed" | "jumpOffset">) {
	return (60 / bpm) * hjd({ bpm, jumpSpeed, jumpOffset });
}
