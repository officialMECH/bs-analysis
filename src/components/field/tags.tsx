import { center, flex, wrap } from "$/styles/patterns";
import { ComponentProps, KeyboardEvent, useState } from "react";

interface Props extends Omit<ComponentProps<"input">, "value" | "onChange"> {
	value?: string[];
	onChange: (values: string[]) => void;
}

export default function Tags({ value = [], onChange, disabled, ...delegated }: Props) {
	const [tags, setTags] = useState<string[]>(value);

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		switch (e.key) {
			case "Enter":
			case ",": {
				e.preventDefault();
				const value = e.currentTarget.value;
				if (!value) return;
				const update = [...tags, value];
				setTags(update);
				e.currentTarget.value = "";
				onChange(update);
				break;
			}
			case "Backspace": {
				const value = e.currentTarget.value;
				if (value) return;
				const update = tags.filter((_, i) => i !== tags.length - 1);
				setTags(update);
				e.currentTarget.value = "";
				onChange(update);
				break;
			}
			default: {
				break;
			}
		}
	}

	function removeTag(index: number) {
		const update = tags.filter((_, i) => i !== index);
		setTags(update);
		onChange(update);
	}

	return (
		<div className={styles.container} style={{ width: "100%" }}>
			{tags.map((tag, index) => (
				<span className={styles.tag} key={index}>
					{tag}
					{!disabled && <i onClick={() => removeTag(index)} className="fa-solid fa-close" />}
				</span>
			))}
			<input {...delegated} disabled={disabled} type="text" onKeyDown={handleKeyDown} className={styles.input} />
		</div>
	);
}

const styles = {
	container: wrap({ gap: 1 }),
	tag: center({ display: "inline-flex", backgroundColor: "neutral", paddingX: 2, gap: 2 }),
	input: flex({ width: "full", grow: 1, basis: 16, hideWebkit: true }),
};
