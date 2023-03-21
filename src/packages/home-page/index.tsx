import { Box } from "@mui/material";

import { ParallaxContainer } from "@sensitive-dogs/common";
import Footer from "@sensitive-dogs/footer";
import Navigation from "@sensitive-dogs/navigation";
import About from "./components/about";
import Header from "./components/header";

export default function HomePage() {
  return (
    <ParallaxContainer>
      <Navigation />
      <Header />

      <Box id="about" sx={{ bgcolor: "background.paper", paddingBottom: 10 }}>
        <About />
      </Box>

      <Footer />
    </ParallaxContainer>
  );
}
