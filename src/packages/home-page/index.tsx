import { Box } from "@mui/material";

import About from "./components/about";
import Header from "./components/header";

export default function HomePage() {
  return (
    <>
      <Header />

      <Box sx={{ bgcolor: "background.paper", paddingBottom: 10 }}>
        <div id="about" style={{ position: "relative", top: -50 }} />
        <About />
      </Box>
    </>
  );
}
