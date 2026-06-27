import { create } from "zustand";
import lodash from "lodash";
import { services as servicesConfig, locations as locationsConfig } from "../config";

type State = {
  location: string | null;
  services: string[] | null;
  includeRemote: boolean;

  // actions
  setLocation: (id: string | null) => void;
  setLocationValidated: (id: string | null) => void;
  setServices: (s: string[] | null) => void;
  addService: (id: string) => void;
  removeService: (id: string) => void;
  cleanServices: () => void;
  setIncludeRemote: (v: boolean) => void;

  filtersIsOpen: boolean;
  setFiltersIsOpen: (open: boolean) => void;
  toggleFilters: () => void;
};

const useProfessionalsStore = create<State>((set, get) => ({
  location: null,
  services: null,
  includeRemote: false,

  setLocation: (id) => set(() => ({ location: id })),
  setLocationValidated: (id) =>
    set(() => {
      if (id === null || id === "") return { location: null };
      if (!locationsConfig[id]) return {}; // ignore invalid ids
      return { location: id };
    }),

  setServices: (s) => set(() => ({ services: s })),
  addService: (id) =>
    set((state) => {
      if (!servicesConfig[id]) return {};
      const next = lodash.union(state.services || [], [id]);
      return { services: next };
    }),
  removeService: (id) =>
    set((state) => {
      if (!servicesConfig[id]) return {};
      const next = lodash.difference(state.services || [], [id]);
      return { services: next };
    }),
  cleanServices: () =>
    set((state) => {
      if (!state.services) return {};
      const cleaned = lodash.intersection(state.services, Object.keys(servicesConfig));
      return { services: cleaned };
    }),

  setIncludeRemote: (v) => set(() => ({ includeRemote: v })),

  filtersIsOpen: false,
  setFiltersIsOpen: (open) => set(() => ({ filtersIsOpen: open })),
  toggleFilters: () => set((s) => ({ filtersIsOpen: !s.filtersIsOpen }))
}));

// selectors / hooks
export const useLocation = () => useProfessionalsStore((s) => s.location);
export const useSetLocation = () => useProfessionalsStore((s) => s.setLocation);
export const useSetLocationValidated = () => useProfessionalsStore((s) => s.setLocationValidated);

export const useServices = () => useProfessionalsStore((s) => s.services);
export const useSetServices = () => useProfessionalsStore((s) => s.setServices);
export const useAddService = () => useProfessionalsStore((s) => s.addService);
export const useRemoveService = () => useProfessionalsStore((s) => s.removeService);
export const useCleanServices = () => useProfessionalsStore((s) => s.cleanServices);

export const useIncludeRemote = () => useProfessionalsStore((s) => s.includeRemote);
export const useSetIncludeRemote = () => useProfessionalsStore((s) => s.setIncludeRemote);

export const useFiltersIsOpen = () => useProfessionalsStore((s) => s.filtersIsOpen);
export const useSetFiltersIsOpen = () => useProfessionalsStore((s) => s.setFiltersIsOpen);
export const useToggleFilters = () => useProfessionalsStore((s) => s.toggleFilters);

export default useProfessionalsStore;
