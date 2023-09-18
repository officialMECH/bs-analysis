import arc from "/images/arc.png";
import bomb from "/images/bomb.png";
import metronome from "/images/metronome.png";
import note from "/images/note.png";
import nps from "/images/nps.png";
import obstacle from "/images/obstacle.png";

export default {
	link: <i className="fa-solid fa-external-link" />,
	title: <i className="fa-solid fa-t" />,
	pack: <i className="fa-solid fa-folder-open" />,
	bpm: <img src={metronome} style={{ width: "1rem" }} />,
	length: <i className="fa-solid fa-clock" />,
	released: <i className="fa-solid fa-calendar-days" />,
	characteristic: <i className="fa-solid fa-list" />,
	difficulty: <i className="fa-solid fa-star" />,
	nps: <img src={nps} style={{ width: "1.25rem" }} />,
	colorNotes: <img src={note} style={{ width: "1.25rem" }} />,
	bombNotes: <img src={bomb} style={{ width: "1.25rem" }} />,
	obstacles: <img src={obstacle} style={{ width: "1.25rem" }} />,
	sliders: <img src={arc} style={{ width: "1rem" }} />,
	burstSliders: <i className="fa-solid fa-link" />,
	basicBeatmapEvents: <i className="fa-solid fa-cube" />,
	colorBoostBeatmapEvents: <i className="fa-solid fa-bolt" />,
	rotationEvents: <i className="fa-solid fa-compass" />,
	bpmEvents: <i className="fa-regular fa-clock" />,
	lightColorEventBoxGroups: <i className="fa-solid fa-lightbulb" />,
	lightRotationEventBoxGroups: <i className="fa-solid fa-rotate" />,
	lightTranslationEventBoxGroups: <i className="fa-solid fa-up-down-left-right" />,
	waypoints: <i className="fa-solid fa-location" />,
	basicEventTypesForKeyword: <i className="fa-solid fa-key" />,
	jumpSpeed: <i className="fa-solid fa-gauge" />,
	jumpOffset: <i className="fa-solid fa-left-right" />,
	hjd: <i className="fa-solid fa-timeline" />,
	jd: <i className="fa-solid fa-ruler" />,
	rt: <i className="fa-solid fa-stopwatch" />,
	mappers: <i className="fa-solid fa-user" />,
	lighters: <i className="fa-regular fa-user" />,
};
