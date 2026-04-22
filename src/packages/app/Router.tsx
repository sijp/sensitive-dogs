import React from "react";

import { getPages } from "@sensitive-dogs/pages";
import { DataContext } from "@sensitive-dogs/app/App";

import { Route, Switch } from "wouter";

interface RouterProps {
  route: string | undefined;
}

type pagesComponent = {
  [key: string]: [string, React.FC];
};

function usePages() {
  const data = React.useContext(DataContext);

  if (!data) return {};

  const pages: pagesComponent = React.useMemo<pagesComponent>(
    () => getPages(data),
    []
  );
  return pages;
}

export default function Router({ route: initialRoute = "/" }: RouterProps) {
  const pages = usePages();
  return (
    <>
      <Switch>
        {Object.entries(pages).map(([pagePath, page]) => (
          <Route key={pagePath} path={"/" + pagePath} component={page[1]} />
        ))}
      </Switch>
    </>
  );
}
