import ReactDOMServer from "react-dom/server";
import App from "./App";

export default function render(route: string): string {
  const result = ReactDOMServer.renderToString(<App route={route} />);
  console.log(result);
  return result;
}
