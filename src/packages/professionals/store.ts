import { create } from "zustand";

export type ProfessionalsQuery = {
  location: string | null;
  services: string[] | null;
  includeRemote: boolean;
};

type State = {
  location: string | null;
  services: string[] | null;
  includeRemote: boolean;

  setLocation: (id: string | null) => void;
  setServices: (s: string[] | null) => void;
  setIncludeRemote: (v: boolean) => void;

  filtersIsOpen: boolean;
  setFiltersIsOpen: (open: boolean) => void;
};

const useProfessionalsStore = create<State>((set) => ({
  location: null,
  services: null,
  includeRemote: false,

  setLocation: (id) => set(() => ({ location: id })),
  setServices: (s) => set(() => ({ services: s })),
  setIncludeRemote: (v) => set(() => ({ includeRemote: v })),

  filtersIsOpen: false,
  setFiltersIsOpen: (open) => set(() => ({ filtersIsOpen: open }))
}));

export const useLocation = () => useProfessionalsStore((s) => s.location);
export const useSetLocation = () => useProfessionalsStore((s) => s.setLocation);

export const useServices = () => useProfessionalsStore((s) => s.services);
export const useSetServices = () => useProfessionalsStore((s) => s.setServices);

export const useIncludeRemote = () => useProfessionalsStore((s) => s.includeRemote);
export const useSetIncludeRemote = () => useProfessionalsStore((s) => s.setIncludeRemote);

export const useFiltersIsOpen = () => useProfessionalsStore((s) => s.filtersIsOpen);
export const useSetFiltersIsOpen = () => useProfessionalsStore((s) => s.setFiltersIsOpen);

export default useProfessionalsStore;
