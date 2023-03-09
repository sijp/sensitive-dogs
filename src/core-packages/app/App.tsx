import React from "react";
import Router from "./Router";

interface AppProps {
  route?: string;
  data: any;
}

export const DataContext = React.createContext({ hello: 2 });

export default function App({ route, data }: AppProps) {
  return (
    <DataContext.Provider value={data}>
      <Router route={route} />
    </DataContext.Provider>
  );
}
