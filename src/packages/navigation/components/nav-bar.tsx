import React from "react";
import { AppBar, Button, IconButton, Link, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataContext } from "@sensitive-dogs/app/App";
import { SensitiveIcon } from "@sensitive-dogs/icons";
import { ResponsiveText } from "@sensitive-dogs/common";
import { MenuContext } from "..";

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[800],
  marginRight: theme.spacing(1),
  fontSize: theme.typography.body1.fontSize,
  [theme.breakpoints.down("md")]: {
    minWidth: 48
  },
  "&:hover": {
    textDecoration: "none"
  }
}));

export default function NavBar() {
  const data = React.useContext(DataContext);
  const [_, actions] = React.useContext(MenuContext);

  if (!data) return null;

  const { menu } = data;
  const highlightedMenuItems = menu.filter((item) => item.highlighted);

  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <IconButton
          color="inherit"
          aria-label="menu"
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              paddingRight: theme.spacing(3),
              paddingLeft: theme.spacing(3)
            }
          })}
          onClick={actions.openDrawer}
        >
          <SensitiveIcon iconName="Bars" />
        </IconButton>
        {highlightedMenuItems.map(
          ({ url, text, icon, type = "link" }, index) => (
            <NavButton
              color="inherit"
              key={`navlink-${index}`}
              startIcon={<SensitiveIcon iconName={icon} />}
              size="large"
              onClick={() => {
                type === "link" ? actions.navigate(url, text) : null;
              }}
            >
              <ResponsiveText>{text}</ResponsiveText>
            </NavButton>
          )
        )}
      </Toolbar>
    </AppBar>
  );
}
