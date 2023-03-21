import React from "react";
import {
  Collapse,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from "@mui/material";

import { DataContext } from "@sensitive-dogs/app/App";
import { SensitiveIcon } from "@sensitive-dogs/icons";
import { MenuContext } from "..";

enum MenuRecordTypes {
  LINK = "link",
  ARTICLES = "articles",
  EXTERNAL = "external"
}

interface ArticlesMenuType {
  entry: {
    label: string;
    path?: string;
  };
  children?: ArticlesMenuType[];
}

function ArticlesMenuFolder({
  data: {
    entry: { label },
    children
  }
}: {
  data: ArticlesMenuType;
}) {
  const [open, setOpen] = React.useState(false);
  const [_, actions] = React.useContext(MenuContext);
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <SensitiveIcon iconName="Newspaper" />
          </ListItemIcon>
          <ListItemText primary={label} />

          <SensitiveIcon iconName={open ? "ChevronUp" : "ChevronDown"} />
        </ListItemButton>
      </ListItem>
      {children ? (
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {[...children]
              .sort((r1, r2) => (r1.entry.label > r2.entry.label ? 1 : -1))
              .map((article) => (
                <ListItem
                  disablePadding
                  key={`article-item-${article.entry.path}`}
                  sx={{ paddingLeft: 4 }}
                >
                  {/* @ts-ignore */}
                  <ListItemButton
                    component={NavLink}
                    href={`/article/${article.entry.path}`}
                    onClick={(event) => {
                      event.preventDefault();
                      if (article.entry.path) {
                        actions.navigate(
                          `/article/${article.entry.path}`,
                          article.entry.label
                        );
                        actions.closeDrawer();
                      }
                    }}
                  >
                    <ListItemIcon>
                      <SensitiveIcon iconName="Circle" />
                    </ListItemIcon>
                    <ListItemText primary={article.entry.label} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}

function ArticlesMenu({ data }: { data: ArticlesMenuType[] }) {
  return (
    <>
      {[...data]
        .sort((r1, r2) => (r1.entry.label > r2.entry.label ? 1 : -1))
        .map((record, index) => (
          <ArticlesMenuFolder key={`article-category-${index}`} data={record} />
        ))}
    </>
  );
}

const NavLink = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren>(
  (props, ref) => <Link {...props} target="_blank" ref={ref} />
);

export default function NavDrawer() {
  const data = React.useContext(DataContext);
  const [state, actions] = React.useContext(MenuContext);
  const { open } = state.drawer;
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (!data) return null;

  const { menu, articlesMenu } = data;

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={actions.closeDrawer}
      onOpen={actions.openDrawer}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <List>
        {menu.map(({ id, text, icon, type, url }) =>
          type === MenuRecordTypes.ARTICLES ? (
            articlesMenu.children ? (
              <ArticlesMenu
                data={articlesMenu.children.filter((am) => am.children)}
                key={`drawer-item-${id}`}
              />
            ) : null
          ) : (
            <ListItem key={`drawer-item-${id}`} disablePadding>
              {/* @ts-ignore */}
              <ListItemButton
                component={NavLink}
                href={url}
                onClick={(event) => {
                  if (type === "link") {
                    event.preventDefault();
                    actions.navigate(url, text);
                    actions.closeDrawer();
                  }
                }}
              >
                <ListItemIcon>
                  <SensitiveIcon iconName={icon} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </SwipeableDrawer>
  );
}
