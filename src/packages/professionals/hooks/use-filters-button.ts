import { useDispatch, useListener } from "@sensitive-dogs/event-bus";

export function useFiltersButton(route: string | undefined = "/professionals") {
  const setOpen = useDispatch<[boolean]>("professionals.filters-isopen");
  const [isOpen] = useListener<[boolean]>("professionals.filters-isopen") || [
    false
  ];

  const [pathWithHash] = route.split("?");
  const [path] = pathWithHash.split("#");

  return [
    isOpen,
    (open: boolean) => setOpen([open]),
    { label: "סינון", icon: "filter_alt", isVisible: path === "/professionals" }
  ] as const;
}
