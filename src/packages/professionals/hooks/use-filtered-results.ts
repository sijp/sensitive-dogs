import React from "react";
import lodash from "lodash";

import { DataContext } from "@sensitive-dogs/app/App";

import { useLocation } from "../hooks/use-location";
import { useServices } from "../hooks/use-services";

export function useFilteredResults() {
  const data = React.useContext(DataContext);
  const [activeLocation] = useLocation();
  const [activeServices] = useServices();

  if (!data) return [];

  const admins = data.team
    .filter((member) => member.admin)
    .map(({ name }) => name);

  const moderators = lodash.difference(
    data.team.map(({ name }) => name),
    admins
  );

  const results = lodash(data.professionals)
    .filter(
      ({ cities }) => activeLocation === null || cities.includes(activeLocation)
    )
    .filter(
      ({ services }) =>
        activeServices === null ||
        lodash.intersection(services, activeServices).length > 0
    )
    .map((p) => ({
      ...p,
      fullName: `${p.firstName} ${p.lastName}`,
      isAdmin: admins.includes(`${p.firstName} ${p.lastName}`),
      isModerator: moderators.includes(`${p.firstName} ${p.lastName}`),
      services: lodash(p.services)
        .sortBy((service) => (activeServices?.includes(service) ? 0 : 1))
        .value(),
      cities: lodash(p.cities)
        .sortBy((city) => (activeLocation === city ? 0 : 1))
        .value()
    }))
    .map((p) => ({
      ...p,
      picture:
        data.team.find((member) => member.name === p.fullName)?.picture || null
    }))
    .groupBy(({ isAdmin, isModerator, pinned }) =>
      isAdmin ? 10 : isModerator ? 100 : pinned ? 1000 : 10000
    )
    .values()
    .flatMap((group) =>
      lodash(group)
        .map((p, index) => ({ ...p, index }))
        .sortBy(({ index }) => {
          const mod = Math.min(12, group.length);
          const grouper = new Date().getMonth() % mod;
          const idGroup = (index % mod) - grouper;
          return idGroup < 0 ? idGroup + mod : idGroup;
        })
        .map(({ index, ...rest }) => rest)
        .value()
    )
    .value();

  return [results, activeServices, activeLocation] as const;
}
