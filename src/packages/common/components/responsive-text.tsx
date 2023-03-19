import { styled } from "@mui/material/styles";

export const ResponsiveText = styled("span")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));
