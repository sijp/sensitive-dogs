import { Typography, Container, Chip, Fab } from "@mui/material";

import { useFilteredResults } from "../hooks/use-filtered-results";
import { useFiltersButton } from "../hooks/use-filters-button";
import { useLocation } from "../hooks/use-location";
import { useServices } from "../hooks/use-services";

import { services, locations } from "../config";
import { SensitiveSymbol } from "@sensitive-dogs/icons";
import { NonMinifiedText } from "@sensitive-dogs/common";

export function ResultsSummary() {
  const [
    _openFilters,
    setOpenFilters,
    { icon: filtersIcon, label: filtersLabel }
  ] = useFiltersButton();
  const [results] = useFilteredResults();
  const [activeLocation, setLocation] = useLocation();
  const [activeServices, _, removeService] = useServices();

  return (
    <Container maxWidth="lg" sx={(theme) => ({ padding: theme.spacing(2) })}>
      <Typography variant="subtitle1">
        <NonMinifiedText
          text={
            results.length === 1
              ? "סה&quot;כ תוצאה אחת"
              : `סה&quot;כ ${results.length} תוצאות`
          }
        />

        {activeServices ? (
          <>
            <NonMinifiedText text=" עבור סוגי השירות" />
            {activeServices.map((service, index) => (
              <Chip
                key={`result-summary-service${index}`}
                label={services[service].label}
                color="primary"
                icon={<SensitiveSymbol iconName={services[service].icon} />}
                sx={(theme) => ({
                  marginLeft: theme.spacing(0.5),
                  marginRight: theme.spacing(0.5),
                  paddingLeft: theme.spacing(1)
                })}
                onClick={() => {
                  removeService(service);
                }}
                onDelete={() => {
                  removeService(service);
                }}
              />
            ))}
          </>
        ) : null}
        {activeLocation ? (
          <>
            <NonMinifiedText text=" באיזור המגורים" />
            <Chip
              label={locations[activeLocation].label}
              color="primary"
              sx={(theme) => ({
                marginLeft: theme.spacing(0.5),
                marginRight: theme.spacing(0.5)
              })}
              onClick={() => {
                setLocation("");
              }}
              onDelete={() => {
                setLocation("");
              }}
            />
          </>
        ) : null}
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          sx={{ float: "right" }}
          onClick={() => {
            setOpenFilters(true);
          }}
        >
          <SensitiveSymbol iconName={filtersIcon} style={{ fontSize: 28 }} />
          {filtersLabel}
        </Fab>
      </Typography>
    </Container>
  );
}
