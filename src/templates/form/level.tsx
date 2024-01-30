import { TField } from "$/components";
import { characteristics, difficulties } from "$/constants/beatmap";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { css } from "$/styles/css";
import { IEntry, schemas } from "$/types";
import { omit } from "$/utils";
import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { Fragment } from "react";
import { parse } from "valibot";
import { Form } from ".";
import { icons } from "..";

interface Props {
	initial?: IEntry;
	disable?: Partial<Record<keyof IEntry, boolean>>;
	onSubmit?: (update: IEntry) => void;
}

export default function ManualDataForm({ initial, disable = {}, onSubmit }: Props) {
	const { key } = useParams("/:key");
	const { state } = useDataset(key);

	const F = useForm({
		validatorAdapter: valibotValidator,
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
		const update: IEntry = {
			...values,
			title: parse(schemas.artificial.string(schemas.entry.entries.title), values.title),
			pack: parse(schemas.artificial.string(schemas.entry.entries.pack), values.pack),
			bpm: parse(schemas.artificial.number(schemas.entry.entries.bpm), values.bpm),
			length: parse(schemas.artificial.number(schemas.entry.entries.length), values.length),
			released: parse(schemas.artificial.string(schemas.entry.entries.released), values.released),
			colorNotes: parse(schemas.artificial.entity(schemas.entry.entries.colorNotes), values.colorNotes),
			bombNotes: parse(schemas.artificial.entity(schemas.entry.entries.bombNotes), values.bombNotes),
			obstacles: parse(schemas.artificial.entity(schemas.entry.entries.obstacles), values.obstacles),
			sliders: parse(schemas.artificial.entity(schemas.entry.entries.sliders), values.sliders),
			burstSliders: parse(schemas.artificial.entity(schemas.entry.entries.burstSliders), values.burstSliders),
			basicBeatmapEvents: parse(schemas.artificial.entity(schemas.entry.entries.basicBeatmapEvents), values.basicBeatmapEvents),
			colorBoostBeatmapEvents: parse(schemas.artificial.entity(schemas.entry.entries.colorBoostBeatmapEvents), values.colorBoostBeatmapEvents),
			rotationEvents: parse(schemas.artificial.entity(schemas.entry.entries.rotationEvents), values.rotationEvents),
			bpmEvents: parse(schemas.artificial.entity(schemas.entry.entries.bpmEvents), values.bpmEvents),
			lightColorEventBoxGroups: parse(schemas.artificial.entity(schemas.entry.entries.lightColorEventBoxGroups), values.lightColorEventBoxGroups),
			lightRotationEventBoxGroups: parse(schemas.artificial.entity(schemas.entry.entries.lightRotationEventBoxGroups), values.lightRotationEventBoxGroups),
			lightTranslationEventBoxGroups: parse(schemas.artificial.entity(schemas.entry.entries.lightTranslationEventBoxGroups), values.lightTranslationEventBoxGroups),
			vfxEventBoxGroups: parse(schemas.artificial.entity(schemas.entry.entries.vfxEventBoxGroups), values.vfxEventBoxGroups),
			waypoints: parse(schemas.artificial.entity(schemas.entry.entries.waypoints), values.waypoints),
			basicEventTypesWithKeywords: parse(schemas.artificial.entity(schemas.entry.entries.basicEventTypesWithKeywords), values.basicEventTypesWithKeywords),
			jumpSpeed: parse(schemas.artificial.number(schemas.entry.entries.jumpSpeed), values.jumpSpeed),
			jumpOffset: parse(schemas.artificial.number(schemas.entry.entries.jumpOffset), values.jumpOffset),
			mappers: parse(schemas.entry.entries.mappers, values.mappers),
			lighters: parse(schemas.entry.entries.lighters, values.lighters),
		};
		if (!initial && state.data.some((x) => x.id === values.id && x.characteristic === values.characteristic && x.difficulty === values.difficulty)) {
			if (!confirm("This entry already exists in the dataset, so any existing data may be overwritten. Are you sure you want to continue?")) return;
		}
		if (onSubmit) onSubmit(omit(update, ...(Object.keys(disable ?? {}) as (keyof IEntry)[])) as IEntry);
	}

	return (
		<F.Provider>
			<Form.Template title={initial ? "Edit Entry" : "Create Entry"}>
				{!initial && (
					<Form.Row size="md">
						<F.Field name="id" validators={{ onChange: schemas.entry.entries.id }} children={(field) => <TField.String field={field} heading="ID" />} />
						<F.Field
							name="characteristic"
							validators={{ onChange: schemas.entry.entries.characteristic }}
							children={(field) => (
								<TField.Enum field={field} heading="Characteristic">
									{characteristics}
								</TField.Enum>
							)}
						/>
						<F.Field
							name="difficulty"
							validators={{ onChange: schemas.entry.entries.difficulty }}
							children={(field) => (
								<TField.Enum field={field} heading="Difficulty">
									{difficulties}
								</TField.Enum>
							)}
						/>
					</Form.Row>
				)}
				<Form.Row size="md">
					<F.Field name="title" validators={{ onChange: schemas.entry.entries.title }} children={(field) => <TField.String field={field} heading="Title" disabled={disable?.[field.name]} />} />
					<F.Field name="pack" validators={{ onChange: schemas.entry.entries.pack }} children={(field) => <TField.String field={field} heading="Pack" disabled={disable?.[field.name]} />} />
					{/* @ts-ignore */}
					<F.Field name="released" validators={{ onChange: schemas.artificial.string(schemas.entry.entries.released) }} children={(field) => <TField.String field={field} heading="Release Date" subheading="(ISO)" disabled={disable?.[field.name]} />} />
					<F.Field name="bpm" validators={{ onChange: schemas.artificial.number(schemas.entry.entries.released) }} children={(field) => <TField.Number field={field} heading="BPM" disabled={disable?.[field.name]} />} />
					<F.Field name="length" validators={{ onChange: schemas.artificial.number(schemas.entry.entries.length) }} children={(field) => <TField.Number field={field} heading="Length" subheading="(sec)" disabled={disable?.[field.name]} />} />
				</Form.Row>
				<Form.Row>
					<F.Field name="colorNotes" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.colorNotes) }} children={(field) => <TField.Number center field={field} heading={icons.colorNotes} disabled={disable?.[field.name]} />} />
					<F.Field name="bombNotes" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.bombNotes) }} children={(field) => <TField.Number center field={field} heading={icons.bombNotes} disabled={disable?.[field.name]} />} />
					<F.Field name="obstacles" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.obstacles) }} children={(field) => <TField.Number center field={field} heading={icons.obstacles} disabled={disable?.[field.name]} />} />
					<F.Field name="sliders" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.sliders) }} children={(field) => <TField.Number center field={field} heading={icons.sliders} disabled={disable?.[field.name]} />} />
					<F.Field name="burstSliders" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.burstSliders) }} children={(field) => <TField.Number center field={field} heading={icons.burstSliders} disabled={disable?.[field.name]} />} />
					<F.Field name="basicBeatmapEvents" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.basicBeatmapEvents) }} children={(field) => <TField.Number center field={field} heading={icons.basicBeatmapEvents} disabled={disable?.[field.name]} />} />
					<F.Field name="colorBoostBeatmapEvents" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.colorBoostBeatmapEvents) }} children={(field) => <TField.Number center field={field} heading={icons.colorBoostBeatmapEvents} disabled={disable?.[field.name]} />} />
					<F.Field name="rotationEvents" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.rotationEvents) }} children={(field) => <TField.Number center field={field} heading={icons.rotationEvents} disabled={disable?.[field.name]} />} />
					<F.Field name="bpmEvents" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.bpmEvents) }} children={(field) => <TField.Number center field={field} heading={icons.bpmEvents} disabled={disable?.[field.name]} />} />
					<F.Field name="lightColorEventBoxGroups" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.lightColorEventBoxGroups) }} children={(field) => <TField.Number center field={field} heading={icons.lightColorEventBoxGroups} disabled={disable?.[field.name]} />} />
					<F.Field name="lightRotationEventBoxGroups" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.lightRotationEventBoxGroups) }} children={(field) => <TField.Number center field={field} heading={icons.lightRotationEventBoxGroups} disabled={disable?.[field.name]} />} />
					<F.Field name="lightTranslationEventBoxGroups" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.lightTranslationEventBoxGroups) }} children={(field) => <TField.Number center field={field} heading={icons.lightTranslationEventBoxGroups} disabled={disable?.[field.name]} />} />
					<F.Field name="vfxEventBoxGroups" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.vfxEventBoxGroups) }} children={(field) => <TField.Number center field={field} heading={icons.vfxEventBoxGroups} disabled={disable?.[field.name]} />} />
					<F.Field name="waypoints" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.waypoints) }} children={(field) => <TField.Number center field={field} heading={icons.waypoints} disabled={disable?.[field.name]} />} />
					<F.Field name="basicEventTypesWithKeywords" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.basicEventTypesWithKeywords) }} children={(field) => <TField.Number center field={field} heading={icons.basicEventTypesWithKeywords} disabled={disable?.[field.name]} />} />
					<F.Field name="jumpSpeed" validators={{ onChange: schemas.artificial.number(schemas.entry.entries.jumpSpeed) }} children={(field) => <TField.Number center field={field} heading={icons.jumpSpeed} disabled={disable?.[field.name]} />} />
					<F.Field name="jumpOffset" validators={{ onChange: schemas.artificial.number(schemas.entry.entries.jumpOffset) }} children={(field) => <TField.Number center field={field} heading={icons.jumpOffset} disabled={disable?.[field.name]} />} />
				</Form.Row>
				<Form.Row size="lg">
					<F.Field name="mappers" validators={{ onChange: schemas.entry.entries.mappers }} children={(field) => <TField.Array field={field} heading="Mapper(s)" disabled={disable?.[field.name]} />} />
					<F.Field name="lighters" validators={{ onChange: schemas.entry.entries.lighters }} children={(field) => <TField.Array field={field} heading="Lighter(s)" disabled={disable?.[field.name]} />} />
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
