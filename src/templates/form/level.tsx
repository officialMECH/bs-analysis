import { Field } from "$/components/field";
import { createLevelIndex } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { css } from "$/styles/css";
import { IData, schemas } from "$/types";
import { useForm } from "@tanstack/react-form";
import { Fragment } from "react";
import { Schema } from "zod";
import { Form } from ".";
import icons from "../icons";

interface Props {
	initial?: IData;
	onSubmit?: () => void;
}

export default function ManualDataForm({ initial, onSubmit }: Props) {
	const { key } = useParams("/:key");
	const { state, dispatch } = useDataset(key);

	function validate<O>(x: unknown, schema: Schema<O>) {
		const parsed = schema.safeParse(x);
		if (!parsed.success) return parsed.error.issues[0].message;
		return undefined;
	}

	const F = useForm({
		defaultValues: {
			id: initial?.id ?? "",
			title: initial?.title ?? undefined,
			pack: initial?.pack ?? undefined,
			released: initial?.released ?? undefined,
			bpm: initial?.bpm ?? undefined,
			length: initial?.length ?? undefined,
			characteristic: initial?.characteristic ?? "Standard",
			difficulty: initial?.difficulty ?? "Easy",
			colorNotes: initial?.colorNotes?.total ?? undefined,
			bombNotes: initial?.bombNotes?.total ?? undefined,
			obstacles: initial?.obstacles?.total ?? undefined,
			sliders: initial?.sliders?.total ?? undefined,
			burstSliders: initial?.burstSliders?.total ?? undefined,
			basicBeatmapEvents: initial?.basicBeatmapEvents?.total ?? undefined,
			colorBoostBeatmapEvents: initial?.colorBoostBeatmapEvents?.total ?? undefined,
			rotationEvents: initial?.rotationEvents?.total ?? undefined,
			bpmEvents: initial?.bpmEvents?.total ?? undefined,
			lightColorEventBoxGroups: initial?.lightColorEventBoxGroups?.total ?? undefined,
			lightRotationEventBoxGroups: initial?.lightRotationEventBoxGroups?.total ?? undefined,
			lightTranslationEventBoxGroups: initial?.lightTranslationEventBoxGroups?.total ?? undefined,
			waypoints: initial?.waypoints?.total ?? undefined,
			basicEventTypesWithKeywords: initial?.basicEventTypesWithKeywords?.total ?? undefined,
			jumpSpeed: initial?.jumpSpeed ?? undefined,
			jumpOffset: initial?.jumpOffset ?? undefined,
			mappers: initial?.mappers ?? undefined,
			lighters: initial?.lighters ?? undefined,
		},
	});

	function handleSubmit(values: typeof F.state.values) {
		if (!state) throw Error("An unexpected error occured.");
		const data = {
			...values,
			id: values.id,
			colorNotes: values.colorNotes ? { total: values.colorNotes } : undefined,
			bombNotes: values.bombNotes ? { total: values.bombNotes } : undefined,
			obstacles: values.obstacles ? { total: values.obstacles } : undefined,
			sliders: values.sliders ? { total: values.sliders } : undefined,
			burstSliders: values.burstSliders ? { total: values.burstSliders } : undefined,
			basicBeatmapEvents: values.basicBeatmapEvents ? { total: values.basicBeatmapEvents } : undefined,
			colorBoostBeatmapEvents: values.colorBoostBeatmapEvents ? { total: values.colorBoostBeatmapEvents } : undefined,
			rotationEvents: values.rotationEvents ? { total: values.rotationEvents } : undefined,
			bpmEvents: values.bpmEvents ? { total: values.bpmEvents } : undefined,
			lightColorEventBoxGroups: values.lightColorEventBoxGroups ? { total: values.lightColorEventBoxGroups } : undefined,
			lightRotationEventBoxGroups: values.lightRotationEventBoxGroups ? { total: values.lightRotationEventBoxGroups } : undefined,
			lightTranslationEventBoxGroups: values.lightTranslationEventBoxGroups ? { total: values.lightTranslationEventBoxGroups } : undefined,
			waypoints: values.waypoints ? { total: values.waypoints } : undefined,
			basicEventTypesWithKeywords: values.basicEventTypesWithKeywords ? { total: values.basicEventTypesWithKeywords } : undefined,
		};
		const parsed = schemas.data.safeParse(data);
		if (!parsed.success) throw parsed.error;
		if (!initial && state.data.some((x) => x.id === values.id && x.characteristic === values.characteristic && x.difficulty === values.difficulty)) {
			if (!confirm("This entry already exists in the dataset, so any existing data will be overwritten. Are you sure you want to continue?")) return;
		}
		dispatch({ type: "UPDATE", payload: { id: key, dataset: { ...state, data: { ...state.data, [`${parsed.data.id}/${createLevelIndex(parsed.data)}`]: parsed.data }, updated: new Date().toISOString() }, overwrite: true } });
		if (onSubmit) onSubmit();
	}

	return (
		<F.Provider>
			<Form.Template title={initial ? "Edit Entry" : "Create Entry"}>
				{!initial && (
					<Form.Row>
						<F.Field name="id" onChange={(x) => validate(x, schemas.data.shape.id)} children={(field) => <Field.String field={field} heading="ID" />} />
						<F.Field
							name="characteristic"
							onChange={(x) => validate(x, schemas.data.shape.characteristic)}
							children={(field) => (
								<Field.Enum field={field} heading="Characteristic">
									{Object.values(schemas.characteristic.Values)}
								</Field.Enum>
							)}
						/>
						<F.Field
							name="difficulty"
							onChange={(x) => validate(x, schemas.data.shape.difficulty)}
							children={(field) => (
								<Field.Enum field={field} heading="Difficulty">
									{Object.values(schemas.difficulty.Values)}
								</Field.Enum>
							)}
						/>
					</Form.Row>
				)}
				<Form.Row>
					<F.Field name="title" onChange={(x) => validate(x, schemas.data.shape.title)} children={(field) => <Field.String field={field} heading="Title" />} />
					<F.Field name="pack" onChange={(x) => validate(x, schemas.data.shape.pack)} children={(field) => <Field.String field={field} heading="Pack" />} />
					{/* @ts-ignore */}
					<F.Field name="released" onChange={(x) => validate(x, schemas.data.shape.released)} children={(field) => <Field.String field={field} heading="Release Date" subheading="(ISO)" />} />
					<F.Field name="bpm" onChange={(x) => validate(x, schemas.data.shape.bpm)} children={(field) => <Field.Number field={field} heading="BPM" />} />
					<F.Field name="length" onChange={(x) => validate(x, schemas.data.shape.length)} children={(field) => <Field.Number field={field} heading="Length" subheading="(sec)" />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="colorNotes" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.colorNotes} />} />
					<F.Field name="bombNotes" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.bombNotes} />} />
					<F.Field name="obstacles" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.obstacles} />} />
					<F.Field name="sliders" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.sliders} />} />
					<F.Field name="burstSliders" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.burstSliders} />} />
					<F.Field name="basicBeatmapEvents" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.basicBeatmapEvents} />} />
					<F.Field name="colorBoostBeatmapEvents" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.colorBoostBeatmapEvents} />} />
					<F.Field name="rotationEvents" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.rotationEvents} />} />
					<F.Field name="bpmEvents" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.bpmEvents} />} />
					<F.Field name="lightColorEventBoxGroups" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.lightColorEventBoxGroups} />} />
					<F.Field name="lightRotationEventBoxGroups" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.lightRotationEventBoxGroups} />} />
					<F.Field name="lightTranslationEventBoxGroups" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.lightTranslationEventBoxGroups} />} />
					<F.Field name="waypoints" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.waypoints} />} />
					<F.Field name="basicEventTypesWithKeywords" onChange={(x) => validate(x, schemas.total.optional())} children={(field) => <Field.Number center field={field} heading={icons.basicEventTypesForKeyword} />} />
					<F.Field name="jumpSpeed" onChange={(x) => validate(x, schemas.data.shape.jumpSpeed)} children={(field) => <Field.Number center field={field} heading={icons.jumpSpeed} />} />
					<F.Field name="jumpOffset" onChange={(x) => validate(x, schemas.data.shape.jumpOffset)} children={(field) => <Field.Number center field={field} heading={icons.jumpOffset} />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="mappers" onChange={(x) => validate(x, schemas.data.shape.mappers)} children={(field) => <Field.Array field={field} heading="Mapper(s)" />} />
					<F.Field name="lighters" onChange={(x) => validate(x, schemas.data.shape.lighters)} children={(field) => <Field.Array field={field} heading="Lighter(s)" />} />
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
