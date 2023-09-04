import { routes } from "@generouted/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StorageProvider } from "./components";
import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
	<StrictMode>
		<StorageProvider>
			<RouterProvider router={createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })} />
		</StorageProvider>
	</StrictMode>
);
