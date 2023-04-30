import React from "react";
import lodash from "lodash";

import { useQueryString } from "./use-query-string";
import { services } from "../config";

export function useServices() {
  const [query, setQuery] = useQueryString();

  React.useEffect(() => {
    setTimeout(() => {
      if (query.services === null) return;

      const cleanedServices = lodash.intersection(
        query.services,
        Object.keys(services)
      );

      if (cleanedServices.length !== query.services.length) {
        setQuery({ services: cleanedServices });
      }
    }, 10);
  }, []);

  const addService = (id: string) => {
    const theService = services[id];
    if (!theService) return;

    setQuery({ services: lodash.union(query.services || [], [id]) });
  };

  const removeService = (id: string) => {
    const theService = services[id];
    if (!theService) return;

    setQuery({ services: lodash.difference(query.services || [], [id]) });
  };

  return [query.services, addService, removeService] as const;
}
