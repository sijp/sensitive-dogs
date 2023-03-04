import ReactDOMServer from "react-dom/server";
import App from "./App";

export default function render(route: string): string {
  return ReactDOMServer.renderToString(<App route={route} />);
}
