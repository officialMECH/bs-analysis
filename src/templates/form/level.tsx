import { TField } from "$/components";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { css } from "$/styles/css";
import { IData, schemas } from "$/types";
import { omit } from "$/utils";
import { useForm } from "@tanstack/react-form";
import { Fragment } from "react";
import { Schema } from "zod";
import { Form } from ".";
import { icons } from "..";

interface Props {
	initial?: IData;
	disable?: Partial<Record<keyof IData, boolean>>;
	onSubmit?: (update: IData) => void;
}

export default function ManualDataForm({ initial, disable = {}, onSubmit }: Props) {
	const { key } = useParams("/:key");
	const { state } = useDataset(key);

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
			vfxEventBoxGroups: initial?.vfxEventBoxGroups?.total ?? undefined,
			waypoints: initial?.waypoints?.total ?? undefined,
			basicEventTypesWithKeywords: initial?.basicEventTypesWithKeywords?.total ?? undefined,
		},
	});

	function handleSubmit(values: typeof F.state.values) {
		if (!state) throw Error("You cannot create new entries in a dataset that does not exist.");
		const update: IData = {
			...values,
			title: schemas.artificial.string(schemas.data.shape.title).parse(values.title),
			pack: schemas.artificial.string(schemas.data.shape.pack).parse(values.pack),
			bpm: schemas.artificial.number(schemas.data.shape.bpm).parse(values.bpm),
			length: schemas.artificial.number(schemas.data.shape.length).parse(values.length),
			released: schemas.artificial.string(schemas.data.shape.released).parse(values.released),
			colorNotes: schemas.artificial.entity(schemas.total).parse(values.colorNotes),
			bombNotes: schemas.artificial.entity(schemas.total).parse(values.bombNotes),
			obstacles: schemas.artificial.entity(schemas.total).parse(values.obstacles),
			sliders: schemas.artificial.entity(schemas.total).parse(values.sliders),
			burstSliders: schemas.artificial.entity(schemas.total).parse(values.burstSliders),
			basicBeatmapEvents: schemas.artificial.entity(schemas.total).parse(values.basicBeatmapEvents),
			colorBoostBeatmapEvents: schemas.artificial.entity(schemas.total).parse(values.colorBoostBeatmapEvents),
			rotationEvents: schemas.artificial.entity(schemas.total).parse(values.rotationEvents),
			bpmEvents: schemas.artificial.entity(schemas.total).parse(values.bpmEvents),
			lightColorEventBoxGroups: schemas.artificial.entity(schemas.total).parse(values.lightColorEventBoxGroups),
			lightRotationEventBoxGroups: schemas.artificial.entity(schemas.total).parse(values.lightRotationEventBoxGroups),
			lightTranslationEventBoxGroups: schemas.artificial.entity(schemas.total).parse(values.lightTranslationEventBoxGroups),
			vfxEventBoxGroups: schemas.artificial.entity(schemas.total).parse(values.vfxEventBoxGroups),
			waypoints: schemas.artificial.entity(schemas.total).parse(values.waypoints),
			basicEventTypesWithKeywords: schemas.artificial.entity(schemas.total).parse(values.basicEventTypesWithKeywords),
			jumpSpeed: schemas.artificial.number(schemas.data.shape.jumpSpeed).parse(values.jumpSpeed),
			jumpOffset: schemas.artificial.number(schemas.data.shape.jumpOffset).parse(values.jumpOffset),
			mappers: schemas.data.shape.mappers.parse(values.mappers),
			lighters: schemas.data.shape.lighters.parse(values.lighters),
		};
		if (!initial && state.data.some((x) => x.id === values.id && x.characteristic === values.characteristic && x.difficulty === values.difficulty)) {
			if (!confirm("This entry already exists in the dataset, so any existing data may be overwritten. Are you sure you want to continue?")) return;
		}
		if (onSubmit) onSubmit(omit(update, ...(Object.keys(disable ?? {}) as (keyof IData)[])) as IData);
	}

	return (
		<F.Provider>
			<Form.Template title={initial ? "Edit Entry" : "Create Entry"}>
				{!initial && (
					<Form.Row size="md">
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
				<Form.Row size="md">
					<F.Field name="title" onChange={(x) => validate(x, schemas.artificial.string(schemas.data.shape.title))} children={(field) => <TField.String field={field} heading="Title" disabled={disable?.[field.name]} />} />
					<F.Field name="pack" onChange={(x) => validate(x, schemas.artificial.string(schemas.data.shape.pack))} children={(field) => <TField.String field={field} heading="Pack" disabled={disable?.[field.name]} />} />
					{/* @ts-ignore */}
					<F.Field name="released" onChange={(x) => validate(x, schemas.artificial.string(schemas.data.shape.released))} children={(field) => <TField.String field={field} heading="Release Date" subheading="(ISO)" disabled={disable?.[field.name]} />} />
					<F.Field name="bpm" onChange={(x) => validate(x, schemas.artificial.number(schemas.data.shape.bpm))} children={(field) => <TField.Number field={field} heading="BPM" disabled={disable?.[field.name]} />} />
					<F.Field name="length" onChange={(x) => validate(x, schemas.artificial.number(schemas.data.shape.length))} children={(field) => <TField.Number field={field} heading="Length" subheading="(sec)" disabled={disable?.[field.name]} />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="colorNotes" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.colorNotes} disabled={disable?.[field.name]} />} />
					<F.Field name="bombNotes" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.bombNotes} disabled={disable?.[field.name]} />} />
					<F.Field name="obstacles" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.obstacles} disabled={disable?.[field.name]} />} />
					<F.Field name="sliders" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.sliders} disabled={disable?.[field.name]} />} />
					<F.Field name="burstSliders" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.burstSliders} disabled={disable?.[field.name]} />} />
					<F.Field name="basicBeatmapEvents" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.basicBeatmapEvents} disabled={disable?.[field.name]} />} />
					<F.Field name="colorBoostBeatmapEvents" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.colorBoostBeatmapEvents} disabled={disable?.[field.name]} />} />
					<F.Field name="rotationEvents" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.rotationEvents} disabled={disable?.[field.name]} />} />
					<F.Field name="bpmEvents" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.bpmEvents} disabled={disable?.[field.name]} />} />
					<F.Field name="lightColorEventBoxGroups" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.lightColorEventBoxGroups} disabled={disable?.[field.name]} />} />
					<F.Field name="lightRotationEventBoxGroups" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.lightRotationEventBoxGroups} disabled={disable?.[field.name]} />} />
					<F.Field name="lightTranslationEventBoxGroups" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.lightTranslationEventBoxGroups} disabled={disable?.[field.name]} />} />
					<F.Field name="vfxEventBoxGroups" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.vfxEventBoxGroups} disabled={disable?.[field.name]} />} />
					<F.Field name="waypoints" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.waypoints} disabled={disable?.[field.name]} />} />
					<F.Field name="basicEventTypesWithKeywords" onChange={(x) => validate(x, schemas.artificial.number(schemas.total))} children={(field) => <TField.Number center field={field} heading={icons.basicEventTypesWithKeywords} disabled={disable?.[field.name]} />} />
					<F.Field name="jumpSpeed" onChange={(x) => validate(x, schemas.artificial.number(schemas.data.shape.jumpSpeed))} children={(field) => <TField.Number center field={field} heading={icons.jumpSpeed} disabled={disable?.[field.name]} />} />
					<F.Field name="jumpOffset" onChange={(x) => validate(x, schemas.artificial.number(schemas.data.shape.jumpOffset))} children={(field) => <TField.Number center field={field} heading={icons.jumpOffset} disabled={disable?.[field.name]} />} />
				</Form.Row>
				<Form.Row size="lg">
					<F.Field name="mappers" onChange={(x) => validate(x, schemas.data.shape.mappers)} children={(field) => <TField.Array field={field} heading="Mapper(s)" disabled={disable?.[field.name]} />} />
					<F.Field name="lighters" onChange={(x) => validate(x, schemas.data.shape.lighters)} children={(field) => <TField.Array field={field} heading="Lighter(s)" disabled={disable?.[field.name]} />} />
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
