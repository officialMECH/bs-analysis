import { DeepKeys, DeepValue } from "@tanstack/react-form";
import { Children, PropsWithChildren, useEffect, useState } from "react";
import Tags from "./tags";
import Wrapper, { Props } from "./wrapper";

export const TField = {
	String: <T, K extends DeepKeys<T>>({ field, disabled, ...wrapper }: Props<T, K>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(() => value as DeepValue<T, K>);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<input name={field?.name as string} disabled={disabled} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Number: <T, K extends DeepKeys<T>>({ field, disabled, ...wrapper }: Props<T, K>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(() => (value !== "" ? Number(value) : value) as DeepValue<T, K>);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<input type="text" name={field?.name as string} disabled={disabled} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Text: <T, K extends DeepKeys<T>>({ field, disabled, ...wrapper }: Props<T, K>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(() => value as DeepValue<T, K>);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<textarea name={field?.name as string} disabled={disabled} value={value ?? ""} onChange={(e) => setValue(e.target.value)} />
			</Wrapper>
		);
	},
	Enum: <T, K extends DeepKeys<T>>({ field, disabled, children, ...wrapper }: PropsWithChildren<Props<T, K>>) => {
		const [value, setValue] = useState(field?.state.value ?? "");
		useEffect(() => {
			field?.handleChange(() => value as DeepValue<T, K>);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<select name={field?.name as string} disabled={disabled} value={value ?? ""} onChange={(e) => setValue(e.target.value as DeepValue<T, K>)}>
					{Children.map(children, (child) => (
						<option>{child}</option>
					))}
				</select>
			</Wrapper>
		);
	},
	Array: <T, K extends DeepKeys<T>>({ field, disabled, ...wrapper }: Props<T, K>) => {
		const [value, setValue] = useState(field?.getValue());
		useEffect(() => {
			field?.handleChange(() => value as DeepValue<T, K>);
		}, [field, value]);
		return (
			<Wrapper field={field} {...wrapper}>
				<Tags name={field?.name as string} disabled={disabled} value={value ?? []} onChange={(value) => setValue(value as DeepValue<T, K>)} />
			</Wrapper>
		);
	},
};
