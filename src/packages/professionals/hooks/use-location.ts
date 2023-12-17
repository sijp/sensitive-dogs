import { useQueryString } from "./use-query-string";
import { locations } from "../config";

export function useLocation() {
  const [query, setQuery] = useQueryString();

  const setLocation = (id: string) => {
    const theLocation = locations[id] || "";
    if (!theLocation && id !== "") return;

    setQuery({ location: id });
  };
  return [query.location, setLocation] as const;
}
