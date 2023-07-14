import { Children, ComponentProps, ComponentType, Fragment } from "react";

interface Props extends ComponentProps<"div"> {
	wrapper?: ComponentType<ComponentProps<"div">>;
}

export default function Map({ children, wrapper: Wrapper = Fragment }: Props) {
	return (
		<Fragment>
			{Children.map(children, (child) => (
				<Wrapper>{child}</Wrapper>
			))}
		</Fragment>
	);
}
