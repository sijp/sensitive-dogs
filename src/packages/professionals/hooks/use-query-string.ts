import React from "react";
import lodash from "lodash";

import { useDispatch, useListener } from "@sensitive-dogs/event-bus";

interface ProfessionalsQueryParams {
  location: string | null;
  services: Array<string> | null;
  includeRemote: boolean;
}

function parseQueryString(querystring: string): ProfessionalsQueryParams {
  const rawParams = new URLSearchParams(querystring);
  return {
    location: rawParams.get("location"),
    services: rawParams.get("services")?.split(",") ?? null,
    includeRemote: Boolean(rawParams.get("includeRemote"))
  };
}

function stringifyQueryParams(
  params: Partial<ProfessionalsQueryParams>
): string {
  const stringfiedValues = {
    location: params.location || "",
    services: params.services?.join(",") || "",
    includeRemote: params.includeRemote ? "true" : ""
  };

  return new URLSearchParams({
    ...lodash.omitBy(stringfiedValues, lodash.isEmpty)
  }).toString();
}

export function useQueryString() {
  const rawParams =
    typeof window !== "undefined" ? window.location.search : "?";

  const [params, setParams] = React.useState(parseQueryString(rawParams));

  const navigate = useDispatch<[string, string, boolean]>("app.navigate");
  const [navigationPath] = useListener<[string]>("app.navigate") || [null];

  React.useEffect(() => {
    if (navigationPath === null) return;

    const [_path, querystring] = navigationPath.split("?");
    setParams(parseQueryString(`?${querystring}`));
  }, [navigationPath]);

  return [
    params,
    (partialQuery: Partial<ProfessionalsQueryParams>) => {
      const currentQuery = parseQueryString(window.location.search);
      const newQueryString = stringifyQueryParams({
        ...currentQuery,
        ...partialQuery
      });

      navigate([
        `${window.location.pathname}?${newQueryString.toString()}`,
        document.title,
        false
      ]);
    }
  ] as readonly [
    ProfessionalsQueryParams,
    (partialQuery: Partial<ProfessionalsQueryParams>) => void
  ];
}
