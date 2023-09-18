import { IDataset, schemas } from "$/types";

type Callback = (id: string, value: IDataset) => void;

function parse(data: { id: string; object: unknown }, callback: Callback) {
	const result = schemas.dataset.safeParse(data.object);
	if (result.success) return callback(data.id, result.data);
	// filter out union errors, as they always flag an error regardless of whether they already passed validation
	const union = result.error.issues.find((issue) => issue.code === "invalid_union");
	if (union && union.code === "invalid_union") {
		const errors = union.unionErrors.filter((ue) => !ue.issues.some((ui) => ui.path.length === 1 && ui.path[0] === "data"));
		errors.forEach((e) => {
			throw e;
		});
	}
	throw result.error;
}

export default {
	raw: parse,
	file: (file: File, callback: Callback) => {
		const id = file.name.split(".")[0];
		const raw = file.text();
		void raw.then((contents) => parse({ id, object: JSON.parse(contents) }, callback));
	},
};
