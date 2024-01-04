import React from "react";
import { Filters } from "./components/filters";
import { MapFilter } from "./components/map-filter";
import { Results } from "./components/results";

export function Professionals() {
  const [showMap, setShowMap] = React.useState(false);
  const toggleMapFilter = () => {
    setShowMap(!showMap);
  };
  return (
    <>
      <Filters onMapClick={() => toggleMapFilter()} />
      {showMap ? <MapFilter width={500} height={500} /> : null}
      <Results />
    </>
  );
}
