import React from "react";
import { ProcessedDataType } from "@sensitive-dogs/data-processor";
import Router from "./Router";

interface AppProps {
  route?: string;
  data: any;
}

export const DataContext = React.createContext<ProcessedDataType | null>(null);

export default function App({ route, data }: AppProps) {
  return (
    <DataContext.Provider value={data}>
      <Router route={route} />
    </DataContext.Provider>
  );
}
