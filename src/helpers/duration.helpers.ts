export function importDuration(value: string) {
	const [x, milliseconds] = value.split(".");
	const [seconds, minutes, hours] = x
		.split(":")
		.reverse()
		.map((e) => Number(e));
	return (seconds ?? 0) + (minutes ?? 0) * 60 + (hours ?? 0) * 3600 + (milliseconds ? Number(milliseconds.padEnd(3, "0") ?? 0) / 1000 : 0);
}

export function formatDuration(x: number, precision = 0) {
	const hours = Math.floor(x / 3600);
	const minutes = Math.floor((x % 3600) / 60);
	const seconds = Number(x % 60).toFixed(precision);
	return [hours, minutes > 9 ? minutes : hours ? String(minutes).padStart(2, "0") : minutes || "0", Number(seconds) > 9 ? seconds : String(seconds).padStart(2, "0")].filter(Boolean).join(":");
}
