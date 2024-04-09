import { createContextScope } from "@radix-ui/react-context";

interface Props {
	value: string[] | undefined;
	defaultValue?: string[];
	onValueChange: (value: string[]) => void;
	disabled?: boolean;
}

const [createContext] = createContextScope("Tags");
const [Provider, useContext] = createContext<Props>("Tags");

export { Provider, useContext, type Props };
