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
  const [path, _hash] = route.includes("#") ? route.split("#") : [route, null];
  if (path === "/") return "index";

  return `${path}`.substring(1).toLocaleLowerCase();
}

function getHash(route: string) {
  const [_path, hash] = route.includes("#") ? route.split("#") : [route, null];
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

  if (!pages[route]) return <div>Page not found</div>;

  const [configuredTitle, Page] = pages[route];
  const title = configuredTitle || eventTitle;

  useTitleEffect(title, eventRoute.split("#")[0], hash, preventPushState);

  return <Page />;
}
