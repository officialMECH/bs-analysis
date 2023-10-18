import { TField } from "$/components";
import { createLevelIndex, parsers } from "$/helpers";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { css } from "$/styles/css";
import { IData, artificial, entity, numeric, schemas } from "$/types";
import { useForm } from "@tanstack/react-form";
import { Fragment } from "react";
import { Schema } from "zod";
import { Form } from ".";
import { icons } from "..";

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
			...initial,
			id: initial?.id ?? "",
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
		},
	});

	function handleSubmit(values: typeof F.state.values) {
		if (!state) throw Error("You cannot create an entry in a dataset that does not exist.");
		const update: IData = {
			...values,
			title: artificial<IData["title"]>(schemas.data.shape.title).parse(values.title),
			pack: artificial<IData["pack"]>(schemas.data.shape.title).parse(values.pack),
			bpm: numeric(schemas.data.shape.bpm).parse(values.bpm),
			length: numeric(schemas.data.shape.length).parse(values.length),
			released: artificial<IData["released"]>(schemas.data.shape.released).parse(values.released),
			colorNotes: entity(schemas.total).parse(values.colorNotes),
			bombNotes: entity(schemas.total).parse(values.bombNotes),
			obstacles: entity(schemas.total).parse(values.obstacles),
			sliders: entity(schemas.total).parse(values.sliders),
			burstSliders: entity(schemas.total).parse(values.burstSliders),
			basicBeatmapEvents: entity(schemas.total).parse(values.basicBeatmapEvents),
			colorBoostBeatmapEvents: entity(schemas.total).parse(values.colorBoostBeatmapEvents),
			rotationEvents: entity(schemas.total).parse(values.rotationEvents),
			bpmEvents: entity(schemas.total).parse(values.bpmEvents),
			lightColorEventBoxGroups: entity(schemas.total).parse(values.lightColorEventBoxGroups),
			lightRotationEventBoxGroups: entity(schemas.total).parse(values.lightRotationEventBoxGroups),
			lightTranslationEventBoxGroups: entity(schemas.total).parse(values.lightTranslationEventBoxGroups),
			waypoints: entity(schemas.total).parse(values.waypoints),
			basicEventTypesWithKeywords: entity(schemas.total).parse(values.basicEventTypesWithKeywords),
			jumpSpeed: numeric(schemas.data.shape.jumpSpeed).parse(values.jumpSpeed),
			jumpOffset: numeric(schemas.data.shape.jumpOffset).parse(values.jumpOffset),
			mappers: artificial<IData["mappers"]>(schemas.data.shape.mappers).parse(values.mappers),
			lighters: artificial<IData["lighters"]>(schemas.data.shape.lighters).parse(values.lighters),
		};
		if (!initial && state.data.some((x) => x.id === values.id && x.characteristic === values.characteristic && x.difficulty === values.difficulty)) {
			if (!confirm("This entry already exists in the dataset, so any existing data will be overwritten. Are you sure you want to continue?")) return;
		}
		parsers.dataset.raw({ id: key, object: { ...state, data: { ...state.data, [`${update.id}/${createLevelIndex(update)}`]: update }, updated: new Date().toISOString() } }, (id, dataset) => {
			dispatch({ type: "UPDATE", payload: { id, dataset, overwrite: true } });
			if (onSubmit) onSubmit();
		});
	}

	return (
		<F.Provider>
			<Form.Template title={initial ? "Edit Entry" : "Create Entry"}>
				{!initial && (
					<Form.Row>
						<F.Field name="id" onChange={(x) => validate(x, schemas.data.shape.id)} children={(field) => <TField.String field={field} heading="ID" />} />
						<F.Field
							name="characteristic"
							onChange={(x) => validate(x, schemas.data.shape.characteristic)}
							children={(field) => (
								<TField.Enum field={field} heading="Characteristic">
									{Object.values(schemas.characteristic.Values)}
								</TField.Enum>
							)}
						/>
						<F.Field
							name="difficulty"
							onChange={(x) => validate(x, schemas.data.shape.difficulty)}
							children={(field) => (
								<TField.Enum field={field} heading="Difficulty">
									{Object.values(schemas.difficulty.Values)}
								</TField.Enum>
							)}
						/>
					</Form.Row>
				)}
				<Form.Row>
					<F.Field name="title" onChange={(x) => validate(x, schemas.data.shape.title)} children={(field) => <TField.String field={field} heading="Title" />} />
					<F.Field name="pack" onChange={(x) => validate(x, schemas.data.shape.pack)} children={(field) => <TField.String field={field} heading="Pack" />} />
					{/* @ts-ignore */}
					<F.Field name="released" onChange={(x) => validate(x, artificial(schemas.data.shape.released))} children={(field) => <TField.String field={field} heading="Release Date" subheading="(ISO)" />} />
					<F.Field name="bpm" onChange={(x) => validate(x, numeric(schemas.data.shape.bpm))} children={(field) => <TField.Number field={field} heading="BPM" />} />
					<F.Field name="length" onChange={(x) => validate(x, numeric(schemas.data.shape.length))} children={(field) => <TField.Number field={field} heading="Length" subheading="(sec)" />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="colorNotes" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.colorNotes} />} />
					<F.Field name="bombNotes" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.bombNotes} />} />
					<F.Field name="obstacles" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.obstacles} />} />
					<F.Field name="sliders" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.sliders} />} />
					<F.Field name="burstSliders" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.burstSliders} />} />
					<F.Field name="basicBeatmapEvents" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.basicBeatmapEvents} />} />
					<F.Field name="colorBoostBeatmapEvents" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.colorBoostBeatmapEvents} />} />
					<F.Field name="rotationEvents" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.rotationEvents} />} />
					<F.Field name="bpmEvents" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.bpmEvents} />} />
					<F.Field name="lightColorEventBoxGroups" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.lightColorEventBoxGroups} />} />
					<F.Field name="lightRotationEventBoxGroups" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.lightRotationEventBoxGroups} />} />
					<F.Field name="lightTranslationEventBoxGroups" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.lightTranslationEventBoxGroups} />} />
					<F.Field name="waypoints" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.waypoints} />} />
					<F.Field name="basicEventTypesWithKeywords" onChange={(x) => validate(x, numeric(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.basicEventTypesWithKeywords} />} />
					<F.Field name="jumpSpeed" onChange={(x) => validate(x, numeric(schemas.data.shape.jumpSpeed))} children={(field) => <TField.Number center field={field} heading={icons.jumpSpeed} />} />
					<F.Field name="jumpOffset" onChange={(x) => validate(x, numeric(schemas.data.shape.jumpOffset))} children={(field) => <TField.Number center field={field} heading={icons.jumpOffset} />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="mappers" onChange={(x) => validate(x, schemas.data.shape.mappers)} children={(field) => <TField.Array field={field} heading="Mapper(s)" />} />
					<F.Field name="lighters" onChange={(x) => validate(x, schemas.data.shape.lighters)} children={(field) => <TField.Array field={field} heading="Lighter(s)" />} />
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