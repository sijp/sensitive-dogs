import { useLocation as useLocationSelector, useSetLocationValidated } from "../store";
import { locations } from "../config";

export function useLocation() {
  const location = useLocationSelector();
  const setLocationValidated = useSetLocationValidated();

  const set = (id: string) => {
    // delegate validation to store; setLocationValidated ignores invalid ids
    setLocationValidated(id);
  };

  return [location, set] as const;
}
