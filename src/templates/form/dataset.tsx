import { TField } from "$/components";
import { useDatasets } from "$/hooks";
import { css } from "$/styles/css";
import { IDataset, schemas } from "$/types";
import { omit } from "$/utils";
import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { Fragment } from "react";
import { parse } from "valibot";
import { Form } from ".";

interface Props {
	initial?: Partial<Omit<IDataset, "data">> & { id: string };
	onSubmit?: () => void;
}

export default function ManualDatasetForm({ initial, onSubmit }: Props) {
	const { state, dispatch } = useDatasets();

	const F = useForm({
		validatorAdapter: valibotValidator,
		defaultValues: { id: initial?.id ?? "", ...initial },
	});

	function handleSubmit(values: typeof F.state.values) {
		const id = parse(schemas.data.id, values.id);
		const update: IDataset = {
			...omit(values, "id"),
			name: parse(schemas.artificial.string(schemas.metadata.v1.dataset.entries.name), values.name),
			contributors: parse(schemas.metadata.v1.dataset.entries.contributors, values.contributors),
			description: parse(schemas.artificial.string(schemas.metadata.v1.dataset.entries.description), values.description),
			data: state[id]?.data ?? [],
		};
		if (!initial && state[id]) {
			if (!confirm("This dataset already exists, so any existing data will be overwritten. Are you sure you want to continue?")) return;
		}
		dispatch({ type: "UPDATE", payload: { id, dataset: { ...update, updated: new Date().toISOString() }, overwrite: true } });
		if (onSubmit) onSubmit();
	}

	return (
		<F.Provider>
			<Form.Template title={initial ? "Edit Dataset" : "Create Dataset"}>
				{!initial && (
					<Form.Row>
						<F.Field name="id" validators={{ onChange: schemas.data.id }} children={(field) => <TField.String field={field} heading="ID" />} />
					</Form.Row>
				)}
				<Form.Row size="lg">
					<F.Field name="name" validators={{ onChange: schemas.artificial.string(schemas.metadata.v1.dataset.entries.name) }} children={(field) => <TField.String field={field} heading="Name" />} />
					<F.Field name="contributors" validators={{ onChange: schemas.metadata.v1.dataset.entries.contributors }} children={(field) => <TField.Array field={field} heading="Contributor(s)" />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="description" validators={{ onChange: schemas.artificial.string(schemas.metadata.v1.dataset.entries.description) }} children={(field) => <TField.Text field={field} heading="Description" />} />
				</Form.Row>
				<F.Subscribe
					selector={() => F.state.canSubmit}
					children={(canSubmit) => {
						return (
							<Fragment>
								<button disabled={!canSubmit} onClick={() => handleSubmit(F.state.values)}>
									{"Submit"}
								</button>
							</Fragment>
						);
					}}
				/>
				{F.state.errors.length > 0 && <small className={styles.error}>{F.state.errors}</small>}
			</Form.Template>
		</F.Provider>
	);
}
const styles = {
	error: css({ color: "danger" }),
};
