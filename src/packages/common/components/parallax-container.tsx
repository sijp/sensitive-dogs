import { styled } from "@mui/material/styles";

export const ParallaxContainer = styled("div")({
  height: "100vh",
  overflowY: "auto",
  overflowX: "hidden",
  perspective: "10px",
  direction: "ltr",
  "& > *": {
    direction: "rtl"
  }
});
