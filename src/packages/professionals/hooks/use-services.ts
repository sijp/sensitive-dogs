import React from "react";
import { useServices as useServicesSelector, useAddService, useRemoveService, useCleanServices } from "../store";

export function useServices() {
  const services = useServicesSelector();
  const add = useAddService();
  const remove = useRemoveService();
  const clean = useCleanServices();

  React.useEffect(() => {
    // clean services once on mount in case persisted/rehydrated state contains invalid keys
    clean();
  }, [clean]);

  return [services, add, remove] as const;
}
