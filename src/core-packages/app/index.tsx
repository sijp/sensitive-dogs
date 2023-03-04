import { hydrateRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const route = window?.location.pathname.substring(1) || "index";
hydrateRoot(container!, <App route={route} />);
