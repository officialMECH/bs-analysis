import { css, cx } from "$/styles/css";
import { ComponentProps } from "react";
import { Icon } from "..";

export default function Spinner({ className = "fa-solid fa-spinner" }: ComponentProps<"i">) {
	return <Icon className={cx(className, styles.wrapper)} />;
}

const styles = {
	wrapper: css({
		animation: "spin 1s linear infinite",
	}),
};
