import React from "react";

import { useListener } from "@sensitive-dogs/event-bus";
import usePages from "@sensitive-dogs/pages";

interface RouterProps {
  route: string | undefined;
}

function translateRoute(route: string) {
  if (route === "/") return "index";
  const [path, _hash] = route.includes("#") ? route.split("#") : [route, null];

  return `${path}`.substring(1).toLocaleLowerCase();
}

function getHash(route: string) {
  const [_path, hash] = route.includes("#") ? route.split("#") : [route, null];
  return hash;
}

export default function Router({ route = "/index" }: RouterProps) {
  const [eventRoute, eventTitle] = useListener<[string, string]>(
    "app.navigate"
  ) || [route === "/" ? "/index" : route, ""];
  const [stateRoute, setRoute] = React.useState(
    translateRoute(eventRoute || route)
  );
  const pages = usePages();
  const [configuredTitle, Page] = pages[stateRoute];
  const title = eventTitle || configuredTitle;

  React.useEffect(() => {
    document.title = title;
    if (translateRoute(eventRoute) === stateRoute) return;
    history.pushState({ route: eventRoute, title }, title, eventRoute);
    setRoute(translateRoute(eventRoute || route));
  }, [eventRoute]);

  React.useEffect(() => {
    const popStateCb = (event: PopStateEvent) => {
      const { route, title } = event.state || {};
      setRoute(
        translateRoute(route || window.location.pathname.substring(1)) ||
          "index"
      );
      document.title = title;
    };
    addEventListener("popstate", popStateCb);
    return () => removeEventListener("popstate", popStateCb);
  }, []);

  return Page ? <Page /> : <div>Page not found</div>;
}
