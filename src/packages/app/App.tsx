import "material-symbols/outlined.css";
import "leaflet/dist/leaflet.css";

import React from "react";
import { ProcessedDataType } from "@sensitive-dogs/data-processor";
import SensitiveThemeProvider from "@sensitive-dogs/sensitive-theme";
import { ParallaxContainer } from "@sensitive-dogs/common";
import Footer from "@sensitive-dogs/footer";
import Navigation from "@sensitive-dogs/navigation";
import Router from "./Router";

interface AppProps {
  route?: string;
  // eslint-disable-next-line
  data: any;
}

export const DataContext = React.createContext<ProcessedDataType | null>(null);

export default function App({ route, data }: AppProps) {
  return (
    <DataContext.Provider value={data}>
      <SensitiveThemeProvider>
        <ParallaxContainer id="content">
          <Navigation route={route} />
          <Router route={route} />
          <Footer />
        </ParallaxContainer>
      </SensitiveThemeProvider>
    </DataContext.Provider>
  );
}
