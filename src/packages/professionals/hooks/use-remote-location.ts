import { useIncludeRemote, useSetIncludeRemote } from "../store";

export function useRemoteLocation() {
  const include = useIncludeRemote();
  const setInclude = useSetIncludeRemote();
  return [include, setInclude] as const;
}
