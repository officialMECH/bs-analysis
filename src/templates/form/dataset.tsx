import { Field } from "$/components/field";
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
	id?: string;
	onSubmit?: () => void;
}

export default function ManualDatasetForm({ id, onSubmit }: Props) {
	const { state, dispatch } = useDatasets();
	const initial = id ? (state[id] as IDataset) : undefined;

	function validate<O>(x: unknown, schema: Schema<O>) {
		const parsed = schema.safeParse(x);
		if (!parsed.success) return parsed.error.issues[0].message;
		return undefined;
	}

	const F = useForm<Omit<IDataset, "data"> & { id?: string }>({
		defaultValues: { id, ...initial },
	});

	function handleSubmit(values: typeof F.state.values) {
		const rid = id ?? values.id;
		if (!rid) throw Error("");
		parsers.raw({ id: rid, object: { ...initial, ...omit(values, "id"), data: initial?.data ?? [] } }, () => {
			dispatch({ type: "UPDATE", payload: { id: rid, dataset: { ...omit(values, "id"), data: {}, updated: new Date().toISOString() }, overwrite: true } });
			if (onSubmit) onSubmit();
		});
	}

	return (
		<F.Provider>
			<Form.Template title={initial ? "Edit Dataset" : "Create Dataset"}>
				{!id && (
					<Form.Row>
						<F.Field name="id" onChange={(x) => validate(x, schemas.id)} children={(field) => <Field.String field={field} heading="ID" />} />
					</Form.Row>
				)}
				<Form.Row>
					<F.Field name="name" onChange={(x) => validate(x, schemas.dataset.shape.name)} children={(field) => <Field.String field={field} heading="Name" />} />
					<F.Field name="contributors" onChange={(x) => validate(x, schemas.dataset.shape.contributors)} children={(field) => <Field.Array field={field} heading="Contributor(s)" />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="description" onChange={(x) => validate(x, schemas.dataset.shape.description)} children={(field) => <Field.Text field={field} heading="Description" />} />
				</Form.Row>
				<F.Subscribe
					selector={() => [F.state.canSubmit, F.state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => {
						return (
							<Fragment>
								<button disabled={!canSubmit} onClick={() => handleSubmit(F.state.values)}>
									{isSubmitting ? "..." : "Submit"}
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
