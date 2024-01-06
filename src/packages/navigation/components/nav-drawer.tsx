import React from "react";
import {
  Collapse,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer
} from "@mui/material";

import { DataContext } from "@sensitive-dogs/app/App";
import { SensitiveSymbol } from "@sensitive-dogs/icons";
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
        <ListItemButton
          onClick={() => setOpen(!open)}
          data-testid={`listfolderbutton-${label}`}
        >
          <ListItemIcon>
            <SensitiveSymbol iconName="Newspaper" />
          </ListItemIcon>
          <ListItemText primary={label} />

          <SensitiveSymbol iconName={open ? "expand_more" : "expand_less"} />
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
                    data-testid={`listarticlebutton-${article.entry.label}`}
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
                      <SensitiveSymbol iconName="Circle" />
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

NavLink.displayName = "NavLink";

export default function NavDrawer() {
  const data = React.useContext(DataContext);
  const [state, actions] = React.useContext(MenuContext);
  const { open } = state.drawer;

  if (!data) return null;

  const { menu, articlesMenu } = data;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={actions.closeDrawer}
      data-testid="drawer"
      keepMounted
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
                data-testid={`listitembutton-${id}`}
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
                  <SensitiveSymbol iconName={icon} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
}
