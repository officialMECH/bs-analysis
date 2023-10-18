import { css, cva, cx } from "$/styles/css";
import { hstack, vstack } from "$/styles/patterns";
import { DeepKeys, FieldApi } from "@tanstack/react-form";
import { Children, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Tooltip } from "..";
import Tags from "./tags";

interface Props<T, V> {
	field?: FieldApi<T, DeepKeys<T>, V>;
	heading: ReactNode;
	subheading?: string;
	center?: boolean;
	tooltip?: () => ReactNode;
}

export default function Wrapper<T, V>({ field, heading, subheading, center, tooltip, children }: PropsWithChildren<Props<T, V>>) {
	return (
		<div className={styles.group} style={{ width: "100%" }}>
			<h2 className={styles.row({ center })}>
				{heading}
				{subheading && <small className={styles.subheading}>{subheading}</small>}
				{tooltip && (
					<Tooltip render={tooltip}>
						<i className={cx("fa-solid fa-question-circle", styles.tooltip)} />
					</Tooltip>
				)}
				{field && field?.state.meta.touchedErrors.length > 0 && (
					<Tooltip render={() => field?.state.meta.touchedErrors}>
						<i className={cx("fa-solid fa-triangle-exclamation", styles.error)} />
					</Tooltip>
				)}
			</h2>
			<div className={styles.input}>{children}</div>
		</div>
	);
}

export const TField = {
	String: <T, V extends string | undefined>({ field, ...wrapper }: Props<T, V>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(value as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<input name={field?.name as string} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Number: <T, V extends number | undefined>({ field, ...wrapper }: Props<T, V>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange((value !== "" ? Number(value) : value) as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<input type="text" name={field?.name as string} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Text: <T, V extends string | undefined>({ field, ...wrapper }: Props<T, V>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(value as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<textarea name={field?.name as string} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Enum: <T, V extends string>({ field, children, ...wrapper }: PropsWithChildren<Props<T, V>>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(value as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<select name={field?.name as string} value={value ?? ""} onChange={(e) => setValue(e.target.value as V)}>
					{Children.map(children, (child) => (
						<option>{child}</option>
					))}
				</select>
			</Wrapper>
		);
	},
	Array: <T, V extends string[] | undefined>({ field, ...wrapper }: Props<T, V>) => {
		const [value, setValue] = useState(field?.state.value);
		useEffect(() => {
			field?.handleChange(value as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<Tags name={field?.name as string} value={value ?? []} onChange={(value) => setValue(value as V)} />
			</Wrapper>
		);
	},
};

const styles = {
	group: vstack({ gap: 1, alignItems: "start", "& > * > input, select, textarea": { width: "full", hideWebkit: true } }),
	row: cva({
		base: hstack.raw({ gap: 2, height: 6, width: "full" }),
		variants: {
			center: {
				true: { justifyContent: "center", alignItems: "center" },
				false: { alignItems: "baseline" },
			},
		},
	}),
	subheading: css({ fontWeight: "normal", color: "subtext" }),
	tooltip: css({ color: "subtext" }),
	input: hstack({ gap: 2, width: "full" }),
	error: css({ color: "danger" }),
};
