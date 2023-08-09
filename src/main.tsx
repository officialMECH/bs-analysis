import { Routes } from "@generouted/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StorageProvider } from "./components";
import "./index.css";

const root = document.getElementById("root")!;
createRoot(root).render(
	<StrictMode>
		<StorageProvider>
			<Routes />
		</StorageProvider>
	</StrictMode>
);
