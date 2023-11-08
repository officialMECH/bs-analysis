import { cva, cx } from "$/styles/css";
import { AsChildProps } from "$/types";
import { Slot } from "@radix-ui/react-slot";

interface Props {
	variant?: "primary" | "danger";
}

export default function Icon({ asChild, variant, children, className, ...delegated }: AsChildProps<"i"> & Props) {
	const As = asChild ? Slot : "i";
	return (
		<As tabIndex={0} className={cx(wrapper({ variant }), className)} {...delegated}>
			{children}
		</As>
	);
}

const wrapper = cva({
	variants: {
		variant: {
			primary: { color: "primary", cursor: "pointer" },
			danger: { color: "danger", cursor: "pointer" },
		},
	},
});
