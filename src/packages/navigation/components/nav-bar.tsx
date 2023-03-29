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

const NavLink = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren>(
  (props, ref) => <Link {...props} target="_blank" ref={ref} />
);

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
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.down("md")]: {
              marginRight: theme.spacing(3),
              marginLeft: theme.spacing(3)
            }
          })}
          onClick={actions.openDrawer}
        >
          <SensitiveIcon iconName="Bars" />
        </IconButton>
        {highlightedMenuItems.map(
          ({ id, url, text, icon, type = "link" }, index) => (
            <NavButton
              color="inherit"
              key={`navlink-${index}`}
              data-testid={`navlink-${id}`}
              startIcon={<SensitiveIcon iconName={icon} />}
              size="large"
              LinkComponent={NavLink}
              href={url}
              onClick={(event) => {
                if (type === "link") {
                  event.preventDefault();
                  actions.navigate(url, text);
                }
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
