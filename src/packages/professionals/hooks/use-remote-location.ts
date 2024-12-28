import { useQueryString } from "./use-query-string";

export function useRemoteLocation() {
  const [query, setQuery] = useQueryString();

  const setRemoteLocation = (isRemote: boolean) => {
    setQuery({ includeRemote: isRemote });
  };
  return [query.includeRemote, setRemoteLocation] as const;
}
