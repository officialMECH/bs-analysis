import { Button } from "$/components/ui/atoms";
import { Field } from "$/components/ui/molecules";
import { Form } from "$/components/ui/organisms";
import { fields } from "$/constants";
import { characteristics, difficulties } from "$/constants/beatmap";
import { useDataset } from "$/hooks";
import { useParams } from "$/router";
import { IEntry, schemas } from "$/types";
import { omit, pick } from "$/utils";
import { useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import { FormEvent, Fragment } from "react";
import { css } from "styled-system/css";
import { parse } from "valibot";

interface Props {
	initial?: IEntry;
	disable?: Partial<Record<keyof IEntry, boolean>>;
	onSubmit?: (update: IEntry) => void;
}

function Component({ initial, disable = {}, onSubmit }: Props) {
	const { key } = useParams("/:key");
	const { state } = useDataset(key);

	const F = useForm({
		validatorAdapter: valibotValidator(),
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
			rotationEvents: initial?.rotationEvents?.total ?? undefined,
			bpmEvents: initial?.bpmEvents?.total ?? undefined,
			njsEvents: initial?.njsEvents?.total ?? undefined,
			basicBeatmapEvents: initial?.basicBeatmapEvents?.total ?? undefined,
			colorBoostBeatmapEvents: initial?.colorBoostBeatmapEvents?.total ?? undefined,
			lightColorEventBoxGroups: initial?.lightColorEventBoxGroups?.total ?? undefined,
			lightRotationEventBoxGroups: initial?.lightRotationEventBoxGroups?.total ?? undefined,
			lightTranslationEventBoxGroups: initial?.lightTranslationEventBoxGroups?.total ?? undefined,
			vfxEventBoxGroups: initial?.vfxEventBoxGroups?.total ?? undefined,
			waypoints: initial?.waypoints?.total ?? undefined,
			basicEventTypesWithKeywords: initial?.basicEventTypesWithKeywords?.total ?? undefined,
		},
		onSubmit: ({ value }) => {
			if (!state) throw Error("You cannot create new entries in a dataset that does not exist.");
			const update: IEntry = {
				...pick(value, "id", "characteristic", "difficulty"),
				title: parse(schemas.artificial.string(schemas.entry.entries.title), value.title),
				pack: parse(schemas.artificial.string(schemas.entry.entries.pack), value.pack),
				bpm: parse(schemas.artificial.number(schemas.entry.entries.bpm), value.bpm),
				length: parse(schemas.artificial.number(schemas.entry.entries.length), value.length),
				released: parse(schemas.artificial.string(schemas.entry.entries.released), value.released),
				colorNotes: parse(schemas.artificial.entity(schemas.entry.entries.colorNotes.wrapped.entries.total), value.colorNotes),
				bombNotes: parse(schemas.artificial.entity(schemas.entry.entries.bombNotes.wrapped.entries.total), value.bombNotes),
				obstacles: parse(schemas.artificial.entity(schemas.entry.entries.obstacles.wrapped.entries.total), value.obstacles),
				sliders: parse(schemas.artificial.entity(schemas.entry.entries.sliders.wrapped.entries.total), value.sliders),
				burstSliders: parse(schemas.artificial.entity(schemas.entry.entries.burstSliders.wrapped.entries.total), value.burstSliders),
				rotationEvents: parse(schemas.artificial.entity(schemas.entry.entries.rotationEvents.wrapped.entries.total), value.rotationEvents),
				bpmEvents: parse(schemas.artificial.entity(schemas.entry.entries.bpmEvents.wrapped.entries.total), value.bpmEvents),
				njsEvents: parse(schemas.artificial.entity(schemas.entry.entries.njsEvents.wrapped.entries.total), value.njsEvents),
				basicBeatmapEvents: parse(schemas.artificial.entity(schemas.entry.entries.basicBeatmapEvents.wrapped.entries.total), value.basicBeatmapEvents),
				colorBoostBeatmapEvents: parse(schemas.artificial.entity(schemas.entry.entries.colorBoostBeatmapEvents.wrapped.entries.total), value.colorBoostBeatmapEvents),
				lightColorEventBoxGroups: parse(schemas.artificial.entity(schemas.entry.entries.lightColorEventBoxGroups.wrapped.entries.total), value.lightColorEventBoxGroups),
				lightRotationEventBoxGroups: parse(schemas.artificial.entity(schemas.entry.entries.lightRotationEventBoxGroups.wrapped.entries.total), value.lightRotationEventBoxGroups),
				lightTranslationEventBoxGroups: parse(schemas.artificial.entity(schemas.entry.entries.lightTranslationEventBoxGroups.wrapped.entries.total), value.lightTranslationEventBoxGroups),
				vfxEventBoxGroups: parse(schemas.artificial.entity(schemas.entry.entries.vfxEventBoxGroups.wrapped.entries.total), value.vfxEventBoxGroups),
				waypoints: parse(schemas.artificial.entity(schemas.entry.entries.waypoints.wrapped.entries.total), value.waypoints),
				basicEventTypesWithKeywords: parse(schemas.artificial.entity(schemas.entry.entries.basicEventTypesWithKeywords.wrapped.entries.total), value.basicEventTypesWithKeywords),
				jumpSpeed: parse(schemas.artificial.number(schemas.entry.entries.jumpSpeed), value.jumpSpeed),
				jumpOffset: parse(schemas.artificial.number(schemas.entry.entries.jumpOffset), value.jumpOffset),
				mappers: parse(schemas.entry.entries.mappers, value.mappers),
				lighters: parse(schemas.entry.entries.lighters, value.lighters),
			};
			if (!initial && state.data.some((x) => x.id === value.id && x.characteristic === value.characteristic && x.difficulty === value.difficulty)) {
				if (!confirm("This entry already exists in the dataset, so any existing data may be overwritten. Are you sure you want to continue?")) return;
			}
			if (onSubmit) onSubmit(omit(update, ...(Object.keys(disable ?? {}) as (keyof IEntry)[])) as IEntry);
		},
	});

	function handleSubmit(event: FormEvent<HTMLElement>) {
		event.preventDefault();
		event.stopPropagation();
		F.handleSubmit();
	}

	return (
		<Form.Root title={initial ? "Edit Entry" : "Create Entry"} onSubmit={handleSubmit}>
			{!initial && (
				<Form.Row size="md">
					<F.Field name="id" validators={{ onChange: schemas.entry.entries.id }} children={(field) => <Field.String field={field} heading="ID" />} />
					<F.Field
						name="characteristic"
						validators={{ onChange: schemas.entry.entries.characteristic }}
						children={(field) => (
							<Field.Enum field={field} heading="Characteristic">
								{characteristics}
							</Field.Enum>
						)}
					/>
					<F.Field
						name="difficulty"
						validators={{ onChange: schemas.entry.entries.difficulty }}
						children={(field) => (
							<Field.Enum field={field} heading="Difficulty">
								{difficulties}
							</Field.Enum>
						)}
					/>
				</Form.Row>
			)}
			<Form.Row size="md">
				<F.Field name="title" validators={{ onChange: schemas.artificial.string(schemas.entry.entries.title) }} children={(field) => <Field.String field={field} heading="Title" disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="pack" validators={{ onChange: schemas.artificial.string(schemas.entry.entries.pack) }} children={(field) => <Field.String field={field} heading="Pack" disabled={disable[field.name as keyof IEntry]} />} />
				{/* @ts-ignore */}
				<F.Field name="released" validators={{ onChange: schemas.artificial.string(schemas.entry.entries.released) }} children={(field) => <Field.String field={field} heading="Release Date" subheading="(ISO)" disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="bpm" validators={{ onChange: schemas.artificial.number(schemas.entry.entries.bpm) }} children={(field) => <Field.Number field={field} heading="BPM" disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="length" validators={{ onChange: schemas.artificial.number(schemas.entry.entries.length) }} children={(field) => <Field.Number field={field} heading="Length" subheading="(sec)" disabled={disable[field.name as keyof IEntry]} />} />
			</Form.Row>
			<Form.Row>
				<F.Field name="colorNotes" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.colorNotes.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.colorNotes.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="bombNotes" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.bombNotes.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.bombNotes.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="obstacles" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.obstacles.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.obstacles.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="sliders" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.sliders.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.sliders.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="burstSliders" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.burstSliders.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.burstSliders.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="basicBeatmapEvents" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.basicBeatmapEvents.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.basicBeatmapEvents.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field
					name="colorBoostBeatmapEvents"
					validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.colorBoostBeatmapEvents.wrapped.entries.total) }}
					children={(field) => <Field.Number center field={field} heading={fields.dataset.colorBoostBeatmapEvents.icon} disabled={disable[field.name as keyof IEntry]} />}
				/>
				<F.Field name="rotationEvents" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.rotationEvents.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.rotationEvents.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="bpmEvents" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.bpmEvents.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.bpmEvents.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="njsEvents" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.njsEvents.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.njsEvents.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field
					name="lightColorEventBoxGroups"
					validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.lightColorEventBoxGroups.wrapped.entries.total) }}
					children={(field) => <Field.Number center field={field} heading={fields.dataset.lightColorEventBoxGroups.icon} disabled={disable[field.name as keyof IEntry]} />}
				/>
				<F.Field
					name="lightRotationEventBoxGroups"
					validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.lightRotationEventBoxGroups.wrapped.entries.total) }}
					children={(field) => <Field.Number center field={field} heading={fields.dataset.lightRotationEventBoxGroups.icon} disabled={disable[field.name as keyof IEntry]} />}
				/>
				<F.Field
					name="lightTranslationEventBoxGroups"
					validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.lightTranslationEventBoxGroups.wrapped.entries.total) }}
					children={(field) => <Field.Number center field={field} heading={fields.dataset.lightTranslationEventBoxGroups.icon} disabled={disable[field.name as keyof IEntry]} />}
				/>
				<F.Field name="vfxEventBoxGroups" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.vfxEventBoxGroups.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.vfxEventBoxGroups.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="waypoints" validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.waypoints.wrapped.entries.total) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.waypoints.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field
					name="basicEventTypesWithKeywords"
					validators={{ onChange: schemas.artificial.entity(schemas.entry.entries.basicEventTypesWithKeywords.wrapped.entries.total) }}
					children={(field) => <Field.Number center field={field} heading={fields.dataset.basicEventTypesWithKeywords.icon} disabled={disable[field.name as keyof IEntry]} />}
				/>
				<F.Field name="jumpSpeed" validators={{ onChange: schemas.artificial.number(schemas.entry.entries.jumpSpeed) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.jumpSpeed.icon} disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="jumpOffset" validators={{ onChange: schemas.artificial.number(schemas.entry.entries.jumpOffset) }} children={(field) => <Field.Number center field={field} heading={fields.dataset.jumpOffset.icon} disabled={disable[field.name as keyof IEntry]} />} />
			</Form.Row>
			<Form.Row size="lg">
				<F.Field name="mappers" validators={{ onChange: schemas.entry.entries.mappers }} children={(field) => <Field.Array field={field} heading="Mapper(s)" disabled={disable[field.name as keyof IEntry]} />} />
				<F.Field name="lighters" validators={{ onChange: schemas.entry.entries.lighters }} children={(field) => <Field.Array field={field} heading="Lighter(s)" disabled={disable[field.name as keyof IEntry]} />} />
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
