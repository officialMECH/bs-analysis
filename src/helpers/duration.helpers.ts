export function importDuration(value: string) {
	const [x, milliseconds] = value.split(".");
	const [seconds, minutes, hours] = x
		.split(":")
		.reverse()
		.map((e) => Number(e));
	return (seconds ?? 0) + (minutes ?? 0) * 60 + (hours ?? 0) * 3600 + (milliseconds ? Number(milliseconds.padEnd(3, "0") ?? 0) / 1000 : 0);
}

export function formatDuration(x: number) {
	const hours = Number(
		Math.floor(x / 3600)
			.toString()
			.padStart(2, "0")
	);
	const minutes = Number(
		Math.floor((x - hours * 3600) / 60)
			.toString()
			.padStart(2, "0")
	);
	const seconds = x - hours * 3600 - Number((minutes * 60).toString().padStart(2, "0"));
	return `${hours > 0 ? `${hours}:` : ""}${minutes > 9 ? `${String(minutes).padStart(2, "0")}` : minutes}:${String(seconds).padStart(2, "0")}`;
}
