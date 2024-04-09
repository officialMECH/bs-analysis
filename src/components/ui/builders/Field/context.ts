import { createContextScope } from "@radix-ui/react-context";

interface ContextProps {
	id: string;
}

const [createContext] = createContextScope("Field");
const [Provider, useContext] = createContext<ContextProps>("Field");

export { Provider, useContext };
