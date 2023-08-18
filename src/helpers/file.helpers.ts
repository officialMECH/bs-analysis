import { IDataset, schemas } from "$/types";

export const parsers = {
	file: (file: File, callback: (id: string, value: IDataset) => void) => {
		const id = file.name.split(".")[0];
		const raw = file.text();
		void raw.then((contents) => {
			const result = schemas.dataset.safeParse(JSON.parse(contents));
			if (!result.success) {
				result.error.issues.forEach((issue) => console.error(`${issue.path.toString()} | ${issue.message}`));
			} else {
				callback(id, result.data);
			}
		});
	},
};
