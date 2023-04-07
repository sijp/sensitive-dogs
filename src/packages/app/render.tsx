import ReactDOMServer from "react-dom/server";
import App from "./App";

// eslint-disable-next-line
export default function render(route: string, data: any): string {
  return ReactDOMServer.renderToString(<App route={`/${route}`} data={data} />);
}
