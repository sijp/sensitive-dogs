import { Filters } from "./components/filters";
import { Results } from "./components/results";
import { ResultsSummary } from "./components/results-summary";

export function Professionals() {
  return (
    <>
      <Filters />
      <ResultsSummary />
      <Results />
    </>
  );
}
