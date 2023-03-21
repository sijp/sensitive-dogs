import React from "react";
import { Box } from "@mui/material";

import { ParallaxHeader } from "@sensitive-dogs/common";
import { DataContext } from "@sensitive-dogs/app/App";
import HeaderCTA from "./header-cta";

export default function Header() {
  const data = React.useContext(DataContext);

  if (!data) return null;
  const { homePage } = data;

  return (
    <ParallaxHeader background={`/public/${homePage.background}`}>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Box
          sx={{
            display: "flex",
            flexBasis: ["100%", "100%", 520]
          }}
        >
          <HeaderCTA
            text={homePage.text}
            logo={homePage.logo}
            buttonText={homePage.button_text}
            buttonIcon={homePage.button_icon}
          />
        </Box>
      </Box>
    </ParallaxHeader>
  );
}
