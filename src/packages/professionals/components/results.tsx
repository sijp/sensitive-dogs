import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions/index.d";

import { useFilteredResults } from "../hooks/use-filtered-results";

import { ResultCard } from "./result-card";

const Transition = React.forwardRef(function Transition(
  props: React.PropsWithChildren<TransitionProps>,
  ref: React.Ref<unknown>
) {
  // @ts-ignore
  return <Slide direction="down" ref={ref} {...props} timeout={350} />;
});

export function Results() {
  const [results, activeServices, activeLocation] = useFilteredResults();
  const [selected, setSelected] = React.useState<(typeof results)[0] | null>(
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
      <Dialog
        open={Boolean(selected)}
        onClose={clearSelection}
        maxWidth="xl"
        PaperProps={{
          sx: {
            minHeight: [0, 0, "70vh"],
            alignItems: "stretch",
            flexDirection: "column"
          }
        }}
        fullWidth={true}
        fullScreen={true}
        keepMounted
        TransitionComponent={Transition}
      >
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
