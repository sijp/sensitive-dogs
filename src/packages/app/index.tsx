import { hydrateRoot, createRoot } from "react-dom/client";

import App from "./App";

import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl
// });

// @ts-ignore
export const data = process.env.__DATA__;

const container = document.getElementById("root");
const route = [
  window.location.pathname,
  window.location.hash,
  window.location.search
].join("");

// @ts-ignore
if (process.env.__HYDRATE__) {
  hydrateRoot(container!, <App route={route} data={data} />);
} else {
  const root = createRoot(container!);
  root.render(<App route={route} data={data} />);
}
