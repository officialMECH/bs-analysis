import { createPrimitive } from "$/components/primitives";
import { Input } from "$/components/ui/atoms";
import { ScopedProps } from "$/types";
import { composeEventHandlers } from "@radix-ui/primitive";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { ElementRef, KeyboardEvent, MouseEvent } from "react";
import { Provider, useContext } from "./context";

interface RootProps {
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[]) => void;
}
const Root = createPrimitive<"div", ScopedProps<RootProps>>("div", (Element, { __scope, asChild, value: valueProp, onValueChange, defaultValue, ...rest }) => {
	const [value, setValue] = useControllableState({ prop: valueProp, onChange: onValueChange, defaultProp: defaultValue });
	return (
		<Provider scope={__scope} value={value} onValueChange={setValue}>
			<Element {...rest} />
		</Provider>
	);
});

const Control = createPrimitive<typeof Input, ScopedProps<{}>>(Input, (Element, { __scope, asChild, ...rest }) => {
	const [value, setValue] = useControllableState({ prop: rest.value, defaultProp: rest.defaultValue, onChange: rest.onValueChange });
	const { value: list, onValueChange, disabled } = useContext("TagsTrigger", __scope);
	const handleKeyDown = composeEventHandlers<KeyboardEvent<ElementRef<typeof Input>>>((event) => {
		if (!list) return;
		switch (event.key) {
			case "Enter":
			case ",": {
				event.preventDefault();
				if (!value) return;
				if (list.includes(value.toString())) {
					setValue("");
					return;
				}
				const update = [...list, value.toString()];
				onValueChange(update);
				setValue("");
				break;
			}
			case "Backspace": {
				if (value) return;
				const update = list.filter((_, i) => i !== list.length - 1);
				onValueChange(update);
				setValue("");
				break;
			}
			default: {
				break;
			}
		}
	});
	return <Element value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled} {...rest} />;
});

const List = createPrimitive<"span", ScopedProps<{}>>("span", (Element, { __scope, asChild, ...rest }) => {
	const { value: list } = useContext("TagsList", __scope);
	if (!list || list.length === 0) return null;
	return <Element {...rest} />;
});

const Item = createPrimitive("li");

const ItemText = createPrimitive("span");

interface CloseProps {
	value: string;
}
const ItemClose = createPrimitive<"button", ScopedProps<CloseProps>>("button", (Element, { __scope, asChild, value, ...rest }) => {
	const { value: list, onValueChange } = useContext("TagsItemClose", __scope);
	const handleClick = composeEventHandlers<MouseEvent<ElementRef<"button">>>(() => {
		if (!list) return;
		const index = list.findIndex((item) => {
			return item === value;
		});
		if (index === -1) return;
		const update = list.filter((_, i) => i !== index);
		onValueChange(update);
	});
	return <Element onClick={handleClick} {...rest}></Element>;
});

export { Control, Item, ItemClose, ItemText, List, Root };
