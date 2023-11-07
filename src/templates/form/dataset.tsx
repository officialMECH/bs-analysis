import { TField } from "$/components";
import { parsers } from "$/helpers";
import { useDatasets } from "$/hooks";
import { css } from "$/styles/css";
import { IDataset, schemas } from "$/types";
import { omit } from "$/utils";
import { useForm } from "@tanstack/react-form";
import { Fragment } from "react";
import { Schema } from "zod";
import { Form } from ".";

interface Props {
	initial?: Partial<Omit<IDataset, "data">> & { id: string };
	onSubmit?: () => void;
}

export default function ManualDatasetForm({ initial, onSubmit }: Props) {
	const { state, dispatch } = useDatasets();

	function validate<O>(x: unknown, schema: Schema<O>) {
		const parsed = schema.safeParse(x);
		if (!parsed.success) return parsed.error.issues[0].message;
		return;
	}

	const F = useForm({
		defaultValues: { id: initial?.id ?? "", ...initial },
		onChange: (values, formApi) => {
			formApi.setFieldValue("name", schemas.artificial.string(schemas.dataset.shape.name).parse(values.name));
			return undefined;
		},
	});

	function handleSubmit(values: typeof F.state.values) {
		const id = values.id;
		const update: IDataset = {
			...omit(values, "id"),
			name: schemas.artificial.string(schemas.dataset.shape.name).parse(values.name),
			contributors: schemas.dataset.shape.contributors.parse(values.contributors),
			description: schemas.artificial.string(schemas.dataset.shape.description).parse(values.description),
			data: state[id]?.data ?? [],
		};
		if (!initial && state[id]) {
			if (!confirm("This dataset already exists, so any existing data will be overwritten. Are you sure you want to continue?")) return;
		}
		parsers.dataset.raw({ id, object: { ...update, updated: new Date().toISOString() } }, (id, dataset) => {
			dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } });
			if (onSubmit) onSubmit();
		});
	}

	return (
		<F.Provider>
			<Form.Template title={initial ? "Edit Dataset" : "Create Dataset"}>
				{!initial && (
					<Form.Row>
						<F.Field name="id" onChange={(x) => validate(x, schemas.id)} children={(field) => <TField.String field={field} heading="ID" />} />
					</Form.Row>
				)}
				<Form.Row>
					<F.Field name="name" onChange={(x) => validate(x, schemas.dataset.shape.name)} children={(field) => <TField.String field={field} heading="Name" />} />
					<F.Field name="contributors" onChange={(x) => validate(x, schemas.dataset.shape.contributors)} children={(field) => <TField.Array field={field} heading="Contributor(s)" />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="description" onChange={(x) => validate(x, schemas.dataset.shape.description)} children={(field) => <TField.Text field={field} heading="Description" />} />
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
				{F.state.formError && <small className={styles.error}>{F.state.formError}</small>}
			</Form.Template>
		</F.Provider>
	);
}
const styles = {
	error: css({ color: "danger" }),
};
