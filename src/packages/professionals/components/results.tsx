import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Dialog } from "@mui/material";

import { useFilteredResults } from "../hooks/use-filtered-results";

import { ResultCard } from "./result-card";

export function Results() {
  const [results, activeServices, activeLocation] = useFilteredResults();
  const [selected, setSelected] = React.useState<typeof results[0] | null>(
    null
  );

  const clearSelection = () => {
    setSelected(null);
  };

  return (
    <Container maxWidth="lg" sx={(theme) => ({ padding: theme.spacing(2) })}>
      <Grid container spacing={2} alignItems="stretch">
        {results.map((result) => (
          <Grid key={`professional-card-${result.id}`} xs={6} sm={4}>
            <ResultCard
              {...{
                result,
                fullscreen: false,
                activeLocation,
                activeServices,
                clearSelection,
                onSelect: () => setSelected(result)
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog fullScreen open={Boolean(selected)} onClose={clearSelection}>
        {selected ? (
          <ResultCard
            {...{
              result: selected,
              fullscreen: true,
              activeLocation,
              activeServices,
              clearSelection
            }}
          />
        ) : null}
      </Dialog>
    </Container>
  );
}
