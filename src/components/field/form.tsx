import { Children, PropsWithChildren, useEffect, useState } from "react";
import Tags from "./tags";
import Wrapper, { Props } from "./wrapper";

export const TField = {
	String: <T, V extends string | undefined>({ field, disabled, ...wrapper }: Props<T, V>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(value as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<input name={field?.name as string} disabled={disabled} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Number: <T, V extends number | undefined>({ field, disabled, ...wrapper }: Props<T, V>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange((value !== "" ? Number(value) : value) as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<input type="text" name={field?.name as string} disabled={disabled} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Text: <T, V extends string | undefined>({ field, disabled, ...wrapper }: Props<T, V>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(value as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<textarea name={field?.name as string} disabled={disabled} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Enum: <T, V extends string>({ field, disabled, children, ...wrapper }: PropsWithChildren<Props<T, V>>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(value as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<select name={field?.name as string} disabled={disabled} value={value ?? ""} onChange={(e) => setValue(e.target.value as V)}>
					{Children.map(children, (child) => (
						<option>{child}</option>
					))}
				</select>
			</Wrapper>
		);
	},
	Array: <T, V extends string[] | undefined>({ field, disabled, ...wrapper }: Props<T, V>) => {
		const [value, setValue] = useState(field?.state.value);
		useEffect(() => {
			field?.handleChange(value as V);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<Tags name={field?.name as string} disabled={disabled} value={value ?? []} onChange={(value) => setValue(value as V)} />
			</Wrapper>
		);
	},
};
