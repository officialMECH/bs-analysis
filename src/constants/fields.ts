import { Icon } from "$/components/ui/atoms";
import { IField } from "$/types";
import { faClock as farClock, faUser as farUser } from "@fortawesome/free-regular-svg-icons";
import { faBolt, faCalendarDays, faCompass, faCube, faExternalLink, faFolderOpen, faGauge, faKey, faLeftRight, faLightbulb, faList, faLocation, faRotate, faRuler, faStar, faStopwatch, faT, faTimeline, faUpDownLeftRight, faVideo, faClock as fasClock, faUser as fasUser } from "@fortawesome/free-solid-svg-icons";
import { createElement } from "react";

function createIcon(type: "image" | "icon" | "text", src?: any) {
	if (type === "image" && typeof src === "string") return createElement("img", { src: src, style: { width: "1em" } });
	if (type === "icon") return createElement(Icon, { icon: src });
}

export const dataset = {
	id: {
		label: "ID",
	},
	link: {
		label: "Link",
		icon: createIcon("icon", faExternalLink),
	},
	title: {
		label: "Title",
		icon: createIcon("icon", faT),
	},
	pack: {
		label: "Pack",
		icon: createIcon("icon", faFolderOpen),
	},
	bpm: {
		label: "BPM",
		icon: createIcon("image", "/images/metronome.png"),
	},
	length: {
		label: "Length",
		icon: createIcon("icon", fasClock),
	},
	released: {
		label: "Release Date",
		icon: createIcon("icon", faCalendarDays),
	},
	characteristic: {
		label: "Characteristic",
		icon: createIcon("icon", faList),
	},
	difficulty: {
		label: "Difficulty",
		icon: createIcon("icon", faStar),
	},
	nps: {
		label: "NPS",
		icon: createIcon("image", "/images/nps.png"),
	},
	colorNotes: {
		label: "Color Notes",
		icon: createIcon("image", "/images/note.png"),
	},
	bombNotes: {
		label: "Bomb Notes",
		icon: createIcon("image", "/images/bomb.png"),
	},
	obstacles: {
		label: "Obstacles",
		icon: createIcon("image", "/images/obstacle.png"),
	},
	sliders: {
		label: "Arcs",
		icon: createIcon("image", "/images/arc.png"),
	},
	burstSliders: {
		label: "Chains",
		icon: createIcon("image", "/images/chain.png"),
	},
	basicBeatmapEvents: {
		label: "Basic Events",
		icon: createIcon("icon", faCube),
	},
	colorBoostBeatmapEvents: {
		label: "Color Boost Events",
		icon: createIcon("icon", faBolt),
	},
	rotationEvents: {
		label: "Rotation Events",
		icon: createIcon("icon", faCompass),
	},
	bpmEvents: {
		label: "BPM Changes",
		icon: createIcon("icon", farClock),
	},
	lightColorEventBoxGroups: {
		label: "Light Color Event Box Groups",
		icon: createIcon("icon", faLightbulb),
	},
	lightRotationEventBoxGroups: {
		label: "Light Rotation Event Box Groups",
		icon: createIcon("icon", faRotate),
	},
	lightTranslationEventBoxGroups: {
		label: "Light Translation Event Box Groups",
		icon: createIcon("icon", faUpDownLeftRight),
	},
	vfxEventBoxGroups: {
		label: "VFX Event Box Groups",
		icon: createIcon("icon", faVideo),
	},
	waypoints: {
		label: "Waypoints",
		icon: createIcon("icon", faLocation),
	},
	basicEventTypesWithKeywords: {
		label: "Special Event Types",
		icon: createIcon("icon", faKey),
	},
	jumpSpeed: {
		label: "Jump Speed",
		icon: createIcon("icon", faGauge),
	},
	jumpOffset: {
		label: "Jump Offset",
		icon: createIcon("icon", faLeftRight),
	},
	hjd: {
		label: "Half-Jump Duration",
		icon: createIcon("icon", faTimeline),
	},
	jd: {
		label: "Jump Distance",
		icon: createIcon("icon", faRuler),
	},
	rt: {
		label: "Reaction Time",
		icon: createIcon("icon", faStopwatch),
	},
	mappers: {
		label: "Mapper(s)",
		icon: createIcon("icon", fasUser),
	},
	lighters: {
		label: "Lighter(s)",
		icon: createIcon("icon", farUser),
	},
} satisfies Record<string, IField>;
