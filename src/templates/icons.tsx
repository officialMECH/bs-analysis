import arc from "/images/arc.png";
import bomb from "/images/bomb.png";
import metronome from "/images/metronome.png";
import note from "/images/note.png";
import nps from "/images/nps.png";
import obstacle from "/images/obstacle.png";

export default {
	link: <i className="fa-solid fa-external-link" />,
	title: <i title="Title" className="fa-solid fa-t" />,
	pack: <i title="Pack" className="fa-solid fa-folder-open" />,
	bpm: <img title="BPM" src={metronome} style={{ width: "1rem" }} />,
	length: <i title="Length" className="fa-solid fa-clock" />,
	released: <i title="Release Date" className="fa-solid fa-calendar-days" />,
	characteristic: <i title="Characteristic" className="fa-solid fa-list" />,
	difficulty: <i title="Difficulty" className="fa-solid fa-star" />,
	nps: <img src={nps} title="Notes Per Second" style={{ width: "1.25rem" }} />,
	colorNotes: <img src={note} title="Color Notes" style={{ width: "1.25rem" }} />,
	bombNotes: <img src={bomb} title="Bomb Notes" style={{ width: "1.25rem" }} />,
	obstacles: <img src={obstacle} title="Obstacles" style={{ width: "1.25rem" }} />,
	sliders: <img src={arc} title="Arcs" style={{ width: "1.25rem" }} />,
	burstSliders: <i title="Chains" className="fa-solid fa-link" />,
	basicBeatmapEvents: <i title="Basic Events" className="fa-solid fa-cube" />,
	colorBoostBeatmapEvents: <i title="Boost Events" className="fa-solid fa-bolt" />,
	rotationEvents: <i title="Rotation Events" className="fa-solid fa-compass" />,
	bpmEvents: <i title="BPM Events" className="fa-regular fa-clock" />,
	lightColorEventBoxGroups: <i title="Light Color Event Box Groups" className="fa-solid fa-lightbulb" />,
	lightRotationEventBoxGroups: <i title="Light Rotation Event Box Groups" className="fa-solid fa-rotate" />,
	lightTranslationEventBoxGroups: <i title="Light Translation Event Box Groups" className="fa-solid fa-up-down-left-right" />,
	vfxEventBoxGroups: <i title="VFX Event Box Groups" className="fa-solid fa-video" />,
	waypoints: <i title="Waypoints" className="fa-solid fa-location" />,
	basicEventTypesWithKeywords: <i title="Special Event Types" className="fa-solid fa-key" />,
	jumpSpeed: <i title="Jump Speed" className="fa-solid fa-gauge" />,
	jumpOffset: <i title="Jump Offset" className="fa-solid fa-left-right" />,
	hjd: <i title="Half-Jump Duration" className="fa-solid fa-timeline" />,
	jd: <i title="Jump Distance" className="fa-solid fa-ruler" />,
	rt: <i title="Reaction Time" className="fa-solid fa-stopwatch" />,
	mappers: <i title="Mapper(s)" className="fa-solid fa-user" />,
	lighters: <i title="Lighter(s)" className="fa-regular fa-user" />,
};
