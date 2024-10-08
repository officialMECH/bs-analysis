import { Button } from "$/components/ui/atoms";
import { Field } from "$/components/ui/molecules";
import { Form } from "$/components/ui/organisms";
import { useDatasets } from "$/hooks";
import { IDataset, IEntry, schemas } from "$/types";
import { omit } from "$/utils";
import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { FormEvent, Fragment } from "react";
import { css } from "styled-system/css";
import { parse } from "valibot";

interface Props {
	initial?: Partial<Omit<IDataset, "data">> & { id: string };
	onSubmit?: (update: IEntry[]) => void;
}

function Component({ initial, onSubmit }: Props) {
	const { state, dispatch } = useDatasets();

	const F = useForm({
		validatorAdapter: valibotValidator(),
		defaultValues: { id: initial?.id ?? "", ...initial },
		onSubmit: ({ value }) => {
			const id = parse(schemas.data.id, value.id);
			const update: IDataset = {
				...omit(value, "id"),
				name: parse(schemas.artificial.string(schemas.metadata.v1.dataset.entries.name), value.name),
				contributors: parse(schemas.metadata.v1.dataset.entries.contributors, value.contributors),
				description: parse(schemas.artificial.string(schemas.metadata.v1.dataset.entries.description), value.description),
				data: state[id]?.data ?? [],
			};
			if (!initial && state[id]) {
				if (!confirm("This dataset already exists, so any existing data will be overwritten. Are you sure you want to continue?")) return;
			}
			dispatch({ type: "UPDATE", payload: { id, dataset: { ...update, updated: new Date().toISOString() }, overwrite: true } });
			if (onSubmit) onSubmit(Object.values(update.data));
		},
	});

	function handleSubmit(event: FormEvent<HTMLElement>) {
		event.preventDefault();
		event.stopPropagation();
		F.handleSubmit();
	}

	return (
		<Form.Root title={initial ? "Edit Dataset" : "Create Dataset"} onSubmit={handleSubmit}>
			{!initial && (
				<Form.Row>
					<F.Field name="id" validators={{ onChange: schemas.data.id }} children={(field) => <Field.String field={field} heading="ID" />} />
				</Form.Row>
			)}
			<Form.Row size="lg">
				<F.Field name="name" validators={{ onChange: schemas.artificial.string(schemas.metadata.v1.dataset.entries.name) }} children={(field) => <Field.String field={field} heading="Name" />} />
				<F.Field name="contributors" validators={{ onChange: schemas.metadata.v1.dataset.entries.contributors }} children={(field) => <Field.Array field={field} heading="Contributor(s)" />} />
			</Form.Row>
			<Form.Row>
				<F.Field name="description" validators={{ onChange: schemas.artificial.string(schemas.metadata.v1.dataset.entries.description) }} children={(field) => <Field.Text field={field} heading="Description" />} />
			</Form.Row>
			<F.Subscribe
				selector={() => F.state.canSubmit}
				children={(canSubmit) => {
					return (
						<Fragment>
							<Button disabled={!canSubmit}>Submit</Button>
						</Fragment>
					);
				}}
			/>
			{F.state.errors.length > 0 && <small className={cn.error}>{F.state.errors}</small>}
		</Form.Root>
	);
}

const cn = {
	error: css({ color: "danger" }),
};

export { Component };
