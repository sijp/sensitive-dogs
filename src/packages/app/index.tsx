import { hydrateRoot, createRoot } from "react-dom/client";

import App from "./App";

// @ts-ignore
export const data = process.env.__DATA__;

const container = document.getElementById("root");
const route = [window.location.pathname, window.location.hash].join("");

// @ts-ignore
if (process.env.__HYDRATE__) {
  hydrateRoot(container!, <App route={route} data={data} />);
} else {
  const root = createRoot(container!);
  root.render(<App route={route} data={data} />);
}
