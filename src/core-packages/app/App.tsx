import React from "react";
import Router from "./Router";

interface AppProps {
  route?: string;
}

export default function App({ route }: AppProps) {
  const [path, setPath] = React.useState(route);

  React.useEffect(() => {
    setPath((/#!(\/.*)$/.exec(window?.location?.hash) || [])[1]);
  }, []);
  return <Router route={route || path} />;
}
