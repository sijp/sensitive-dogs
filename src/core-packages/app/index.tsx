import { hydrateRoot } from "react-dom/client";
import App from "./App";

// @ts-ignore
const data = process.env.__DATA__;

const container = document.getElementById("root");
const route = window?.location.pathname.substring(1) || "index";
hydrateRoot(container!, <App route={route} data={data} />);
