import React from "react";
import { Filters } from "./components/filters";
import { MapFilter } from "./components/map-filter";
import { Results } from "./components/results";
import { ResultsSummary } from "./components/results-summary";

export function Professionals() {
  const [showMap, setShowMap] = React.useState(false);

  return (
    <>
      <Filters onMapClick={() => setShowMap(true)} />
      <ResultsSummary />
      <MapFilter
        width={500}
        height={500}
        open={showMap}
        onClose={() => setShowMap(false)}
      />
      <Results />
    </>
  );
}
