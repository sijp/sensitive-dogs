import React from "react";

import { useListener, useDispatch } from "@sensitive-dogs/event-bus";
import { getPages } from "@sensitive-dogs/pages";
import { DataContext } from "@sensitive-dogs/app/App";

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

function translateRoute(route: string) {
  const [pathName, _querystring] = route.includes("?")
    ? route.split("?")
    : [route, null];
  const [path, _hash] = pathName.includes("#")
    ? pathName.split("#")
    : [pathName, null];
  if (path === "/") return "index";

  return `${path}`.substring(1).toLocaleLowerCase();
}

function getHash(route: string) {
  const [pathName, _querystring] = route.includes("?")
    ? route.split("?")
    : [route, null];
  const [_path, hash] = pathName.includes("#")
    ? pathName.split("#")
    : [pathName, null];
  return hash;
}

function useTitleEffect(
  title: string,
  path: string,
  pathHash: string | null,
  preventPushState: boolean | null
) {
  const dispatch = useDispatch<[string, string, boolean]>("app.navigate");
  const firstUpdate = React.useRef(true);
  const route = path.toLocaleLowerCase() === "index" ? "/" : path;
  const hash = pathHash ? `#${pathHash}` : "";

  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      history.replaceState({ route, hash, title }, title, `${route}${hash}`);
      return;
    }
    if (!preventPushState) {
      history.pushState({ route, hash, title }, title, `${route}${hash}`);
    }
    document.title = title;
  }, [title, route, hash]);

  React.useEffect(() => {
    const popStateCb = (event: PopStateEvent) => {
      if (!event.state) return;
      const {
        route: prevRoute,
        title: prevTitle,
        hash: prevHash
      } = event.state;
      dispatch([`${prevRoute}${prevHash}`, prevTitle, true]);
    };
    addEventListener("popstate", popStateCb);
    return () => removeEventListener("popstate", popStateCb);
  }, []);
}

export default function Router({ route: initialRoute = "/" }: RouterProps) {
  const [eventRoute, eventTitle, preventPushState] = useListener<
    [string, string, boolean | null]
  >("app.navigate") || [initialRoute, "", true];

  const pages = usePages();

  const route = translateRoute(eventRoute);
  const hash = getHash(eventRoute);

  React.useEffect(() => {
    setTimeout(() => {
      if (hash) {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        document
          .getElementById("content")
          ?.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 10);
  }, [route, hash]);

  const [configuredTitle, Page] = pages[route] || [
    "Not Found",
    () => <div>Page not found</div>
  ];
  const title = configuredTitle || eventTitle;
  useTitleEffect(title, eventRoute.split("#")[0], hash, preventPushState);

  return <Page />;
}
