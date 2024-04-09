import { Select, TextArea } from "$/components/ui/atoms";
import { Field } from "$/components/ui/builders";
import { Tags } from "$/components/ui/molecules";
import { DeepKeys, DeepValue } from "@tanstack/react-form";
import { Children, PropsWithChildren, useEffect, useState } from "react";
import { Props, Component as Wrapper } from "./wrapper";

const String = <T, K extends DeepKeys<T>>({ field, disabled, ...wrapper }: Props<T, K>) => {
	const [value, setValue] = useState(field?.state.value ?? "");
	useEffect(() => {
		field?.handleChange(() => value as DeepValue<T, K>);
	}, [field, value]);
	return (
		<Wrapper field={field} {...wrapper}>
			<Field.Input disabled={disabled} value={value} onChange={(e) => setValue(e.target.value)} />
		</Wrapper>
	);
};
const NumberField = <T, K extends DeepKeys<T>>({ field, disabled, ...wrapper }: Props<T, K>) => {
	const [value, setValue] = useState(field?.state.value ?? "");
	useEffect(() => {
		console.log();
		field?.handleChange(() => (value !== "" ? Number(value) : value) as DeepValue<T, K>);
	}, [field, value]);
	return (
		<Wrapper field={field} {...wrapper}>
			<Field.Input disabled={disabled} value={value} onChange={(e) => setValue(e.target.value)} />
		</Wrapper>
	);
};
const Text = <T, K extends DeepKeys<T>>({ field, disabled, ...wrapper }: Props<T, K>) => {
	const [value, setValue] = useState(field?.state.value ?? "");
	useEffect(() => {
		field?.handleChange(() => value as DeepValue<T, K>);
	}, [field, value]);
	return (
		<Wrapper field={field} {...wrapper}>
			<Field.Input asChild disabled={disabled}>
				<TextArea value={value} onChange={(e) => setValue(e.target.value)} />
			</Field.Input>
		</Wrapper>
	);
};
const Enum = <T, K extends DeepKeys<T>>({ field, disabled, children, ...wrapper }: PropsWithChildren<Props<T, K>>) => {
	const [value, setValue] = useState(field?.state.value ?? "");
	useEffect(() => {
		field?.handleChange(() => value as DeepValue<T, K>);
	}, [field, value]);
	return (
		<Wrapper field={field} {...wrapper}>
			<Field.Input asChild disabled={disabled}>
				<Select value={value} onChange={(e) => setValue(e.target.value as DeepValue<T, K>)}>
					{Children.map(children, (child) => (
						<option>{child}</option>
					))}
				</Select>
			</Field.Input>
		</Wrapper>
	);
};
const Array = <T, K extends DeepKeys<T>>({ field, disabled, ...wrapper }: Props<T, K>) => {
	const [value, setValue] = useState(field?.getValue());
	useEffect(() => {
		field?.handleChange(() => value as DeepValue<T, K>);
	}, [field, value]);
	return (
		<Wrapper field={field} {...wrapper}>
			<Field.Input asChild disabled={disabled}>
				<Tags value={value} onValueChange={(value) => setValue(value as DeepValue<T, K>)} />
			</Field.Input>
		</Wrapper>
	);
};

export { Array, Enum, NumberField as Number, String, Text };
