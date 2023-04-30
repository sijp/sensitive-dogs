import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

import "./index.css";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["Assistant", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      paddingTop: 24,
      paddingBottom: 24
    },
    h2: {
      paddingTop: 24,
      paddingBottom: 24
    }
  },
  palette: {
    secondary: { light: "#c3977c", main: "#8f6c56", dark: "#483620" },
    primary: { light: "#edf5e8", main: "#b5d1a0", dark: "#84aa67" }
  }
});

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin]
});

const cacheCss = createCache({
  key: "css"
});

function RTL(props: React.PropsWithChildren) {
  if (typeof window !== "undefined") {
    return (
      <CacheProvider value={cacheCss}>
        <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
      </CacheProvider>
    );
  }
  const serverCacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
  });
  const serverCacheCss = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
  });

  return (
    <CacheProvider value={serverCacheCss}>
      <CacheProvider value={serverCacheRtl}>{props.children}</CacheProvider>
    </CacheProvider>
  );
}

export default function SensitiveThemeProvider({
  children
}: React.PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <RTL>{children}</RTL>
    </ThemeProvider>
  );
}
