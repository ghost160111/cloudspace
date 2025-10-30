import { ReactApp } from "utils/classes/ReactApp";
import { HistoryAPIPlugin, HistoryModulePlugin } from "utils/classes/ReactPlugin";
import App from "app/App";

type Mode = "development" | "production";

const env = import.meta.env;
const MODE: Mode = env.VITE_MODE as Mode;
const IS_DEV: boolean = MODE === "development";

const root = document.getElementById("app");
if (!root) {
    throw new Error("No root container was found");
}

new ReactApp(root!)
    .use(HistoryAPIPlugin)
    .use(HistoryModulePlugin)
    .render(<App />, IS_DEV);
