import { create } from "zustand";

export type ProfessionalsQuery = {
  location: string | null;
  services: string[] | null;
  includeRemote: boolean;
};

export function parseQueryString(querystring: string): ProfessionalsQuery {
  const rawParams = new URLSearchParams(querystring);
  return {
    location: rawParams.get("location"),
    services: rawParams.get("services")?.split(",") ?? null,
    includeRemote: Boolean(rawParams.get("includeRemote"))
  };
}

export function stringifyQueryParams(params: Partial<ProfessionalsQuery>): string {
  const vals: Record<string, string> = {
    location: params.location ?? "",
    services: params.services?.join(",") ?? "",
    includeRemote: params.includeRemote ? "true" : ""
  };

  const filtered: Record<string, string> = {};
  Object.entries(vals).forEach(([k, v]) => {
    if (v !== "" && v != null) filtered[k] = v;
  });

  return new URLSearchParams(filtered).toString();
}

type State = {
  query: ProfessionalsQuery;
  setQuery: (partial: Partial<ProfessionalsQuery>) => void;
  setQueryFromUrl: (search: string) => void;

  filtersIsOpen: boolean;
  setFiltersIsOpen: (open: boolean) => void;
};

const getInitialQuery = (): ProfessionalsQuery => {
  if (typeof window === "undefined") {
    return { location: null, services: null, includeRemote: false };
  }
  return parseQueryString(window.location.search || "?");
};

const useProfessionalsStore = create<State>((set) => ({
  query: getInitialQuery(),
  setQuery: (partial) =>
    set((s) => ({ query: { ...s.query, ...partial } })),
  setQueryFromUrl: (search) =>
    set(() => ({ query: parseQueryString(search || "?") })),

  filtersIsOpen: false,
  setFiltersIsOpen: (open) => set(() => ({ filtersIsOpen: open }))
}));

// Typed selectors / hooks (preferred)
export const useProfessionalsQuery = () => useProfessionalsStore((s) => s.query);
export const useSetProfessionalsQuery = () => useProfessionalsStore((s) => s.setQuery);
export const useSetQueryFromUrl = () => useProfessionalsStore((s) => s.setQueryFromUrl);

export const useFiltersIsOpen = () => useProfessionalsStore((s) => s.filtersIsOpen);
export const useSetFiltersIsOpen = () => useProfessionalsStore((s) => s.setFiltersIsOpen);

export default useProfessionalsStore;
