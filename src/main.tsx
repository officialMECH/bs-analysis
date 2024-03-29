import { routes } from "@generouted/react-router";
import { registerTheme } from "echarts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Storage } from "./components/context";
import "./index.css";

const light = await import("$/assets/charts/light.json");
const dark = await import("$/assets/charts/dark.json");

registerTheme("dark", { ...dark.default });
registerTheme("light", { ...light.default });

const root = document.getElementById("root")!;

createRoot(root).render(
	<StrictMode>
		<Storage.Provider>
			<RouterProvider router={createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })} />
		</Storage.Provider>
	</StrictMode>
);
