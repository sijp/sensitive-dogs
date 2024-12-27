import React from "react";

import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Checkbox,
  NativeSelect,
  Container,
  Box,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";

import { SensitiveSymbol } from "@sensitive-dogs/icons";

import { services, locations } from "../config";
import { useLocation } from "../hooks/use-location";
import { useServices } from "../hooks/use-services";
import { useRemoteLocation } from "../hooks/use-remote-location";
import { useFiltersButton } from "../hooks/use-filters-button";
import { MapFilter } from "./map-filter";

function ListToggle({
  id,
  label,
  onChange,
  defaultChecked,
  icon,
  checkedIcon
}: {
  id: string;
  label: string;
  onChange: (checked: boolean) => void;
  defaultChecked: boolean;
  icon?: string;
  checkedIcon?: string;
}) {
  const [active, setActive] = React.useState(defaultChecked);
  const labelId = `list-toggle-${id}`;
  const handler = () => {
    onChange(!active);
    setActive(!active);
  };
  return (
    <ListItem
      secondaryAction={
        <Switch
          color="secondary"
          checked={active}
          onChange={handler}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      disablePadding
    >
      <ListItemButton onClick={handler} dense>
        <ListItemIcon>
          <Checkbox
            color="secondary"
            checked={active}
            tabIndex={-1}
            disableRipple
            icon={
              icon ? (
                <SensitiveSymbol iconName={icon} variant="regular" />
              ) : null
            }
            checkedIcon={
              checkedIcon ? (
                <SensitiveSymbol iconName={checkedIcon} variant="solid" />
              ) : null
            }
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={label} />
      </ListItemButton>
    </ListItem>
  );
}

export function Filters() {
  const [activeLocation, setLocation] = useLocation();
  const [activeServices, addService, removeService] = useServices();
  const [remoteFilter, setRemoteFilter] = useRemoteLocation();
  const [expandedAccordion, setExpandedAccordion] = React.useState<
    string | false
  >("panel1");

  const [open, setOpen] = useFiltersButton();

  const createAccordionChangeHandler =
    (panel: string) => (_ev: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded && panel);
    };

  return (
    <Container
      maxWidth="lg"
      sx={(theme) => ({ padding: theme.spacing(1), textAlign: "right" })}
    >
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        data-testid="filters-drawer"
        PaperProps={{
          sx: (theme) => ({
            width: "40%",
            [theme.breakpoints.down("sm")]: { width: "85%" }
          })
        }}
      >
        <Accordion
          expanded={expandedAccordion === "panel1"}
          onChange={createAccordionChangeHandler("panel1")}
        >
          <AccordionSummary
            expandIcon={<SensitiveSymbol iconName={"keyboard_arrow_up"} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">סוג שירות</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {Object.entries(services).map(([serviceId, service]) => (
                <ListToggle
                  key={`drawer-service-${serviceId}`}
                  id={`service-${serviceId}`}
                  data-testid={`listitembutton-service-${serviceId}`}
                  defaultChecked={activeServices?.includes(serviceId) || false}
                  label={service.label}
                  icon={service.icon}
                  checkedIcon={service.icon}
                  onChange={(active) => {
                    if (active) {
                      addService(serviceId);
                    } else {
                      removeService(serviceId);
                    }
                  }}
                />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expandedAccordion === "panel2"}
          onChange={createAccordionChangeHandler("panel2")}
        >
          <AccordionSummary
            expandIcon={<SensitiveSymbol iconName={"keyboard_arrow_down"} />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">איזור שירות</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListToggle
                id="remote-location-filter"
                data-testid="remote-location-filter"
                defaultChecked={remoteFilter}
                label={"שירות אונליין"}
                icon={"video_camera_front"}
                checkedIcon={"video_camera_front"}
                onChange={(active) => {
                  setRemoteFilter(active);
                }}
              />
              <ListItem>
                <NativeSelect
                  value={activeLocation || ""}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                  sx={{ width: "100%" }}
                >
                  <option value="">הכל</option>
                  {Object.entries(locations)
                    .sort(
                      ([_locationIdA, locationA], [_locationIdB, locationB]) =>
                        locationA.label > locationB.label ? 1 : -1
                    )
                    .map(([locationId, location]) => (
                      <option
                        key={`drawer-location-${locationId}`}
                        value={locationId}
                      >
                        {location.label}
                      </option>
                    ))}
                </NativeSelect>
              </ListItem>
              <ListItem>
                <MapFilter width={"100%"} height={500} />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Box
          sx={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            padding: 1,
            alignItems: "stretch"
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            שמירה
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
}
