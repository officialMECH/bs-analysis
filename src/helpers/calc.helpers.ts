import { IEntity, IEntry } from "$/types";
import { importDuration } from "./duration.helpers";

const HJD_START = 4;
const HJD_MIN = 0.25;
const HJ_MAX = 17.999;

function count(group: IEntity | undefined) {
	return group ? group.total : 0;
}

function nps({ colorNotes, length }: Pick<IEntry, "colorNotes" | "length">) {
	if (!colorNotes || !length) return undefined;
	return colorNotes.total / importDuration(length.toString());
}

function hjd({ bpm, jumpSpeed, jumpOffset }: Pick<IEntry, "bpm" | "jumpSpeed" | "jumpOffset">) {
	if (!bpm || !jumpSpeed) return undefined;
	const num = 60 / bpm;
	let hjd = HJD_START;
	while (jumpSpeed * num * hjd > HJ_MAX) hjd /= 2;
	if (hjd < 1) hjd = 1;
	return Math.max(hjd + (jumpOffset ?? 0), HJD_MIN);
}

function jd({ bpm, jumpSpeed, jumpOffset }: Pick<IEntry, "bpm" | "jumpSpeed" | "jumpOffset">) {
	if (!bpm || !jumpSpeed) return undefined;
	return jumpSpeed * (60 / bpm) * hjd({ bpm, jumpSpeed, jumpOffset })! * 2;
}

function rt({ bpm, jumpSpeed, jumpOffset }: Pick<IEntry, "bpm" | "jumpSpeed" | "jumpOffset">) {
	if (!bpm || !jumpSpeed) return undefined;
	return (60 / bpm) * hjd({ bpm, jumpSpeed, jumpOffset })!;
}

export default { count, nps, hjd, jd, rt };
