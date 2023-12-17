import React from "react";
import {
  AppBar,
  Box,
  Button,
  Fade,
  IconButton,
  Link,
  Toolbar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataContext } from "@sensitive-dogs/app/App";
import { SensitiveSymbol } from "@sensitive-dogs/icons";
import { ResponsiveText } from "@sensitive-dogs/common";
import { useFiltersButton } from "@sensitive-dogs/professionals/hooks/use-filters-button";
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

NavLink.displayName = "NavLink";

export default function NavBar() {
  const data = React.useContext(DataContext);
  const [{ route }, actions] = React.useContext(MenuContext);
  const [
    _,
    setFiltersOpen,
    { icon: filtersIcon, label: filtersLabel, isVisible: isFiltersIconVisible }
  ] = useFiltersButton(route);
  const [showExtraActions, setShowExtraActions] = React.useState(false);

  React.useEffect(() => {
    const content = document.getElementById("content");
    const handler = () => {
      if (content && content.scrollTop > 20) {
        setShowExtraActions(true);
      } else {
        setShowExtraActions(false);
      }
    };
    content?.addEventListener("scroll", handler);

    return () => {
      content?.removeEventListener("scroll", handler);
    };
  }, []);

  if (!data) return null;

  const { menu } = data;
  const highlightedMenuItems = menu.filter((item) => item.highlighted);

  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <IconButton
          color="inherit"
          aria-label="menu"
          data-testid="menu-button"
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
          <SensitiveSymbol iconName="menu" style={{ fontSize: 28 }} />
        </IconButton>
        {highlightedMenuItems.map(
          ({ id, url, text, icon, type = "link" }, index) => (
            <NavButton
              color="inherit"
              key={`navlink-${index}`}
              data-testid={`navlink-${id}`}
              startIcon={
                <SensitiveSymbol iconName={icon} style={{ fontSize: 28 }} />
              }
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

        <Box
          sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
        >
          <NavButton
            onClick={() => history.back()}
            color="inherit"
            sx={{ display: ["flex", "flex", "none"] }}
          >
            <SensitiveSymbol iconName={"arrow_back"} style={{ fontSize: 28 }} />
          </NavButton>
          {isFiltersIconVisible ? (
            <Fade in={showExtraActions} mountOnEnter unmountOnExit>
              <NavButton
                onClick={() => setFiltersOpen(true)}
                color="inherit"
                startIcon={
                  <SensitiveSymbol
                    iconName={filtersIcon}
                    style={{ fontSize: 28 }}
                  />
                }
              >
                <ResponsiveText>{filtersLabel}</ResponsiveText>
              </NavButton>
            </Fade>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
