import { Box } from "@mui/material";
import { ParallaxContainer } from "@sensitive-dogs/common";
import About from "./components/about";
import Header from "./components/header";

export default function HomePage() {
  return (
    <ParallaxContainer>
      <Header />

      <Box id="about" sx={{ bgcolor: "background.paper", paddingBottom: 10 }}>
        <About />
      </Box>

      <Header />
    </ParallaxContainer>
  );
}
