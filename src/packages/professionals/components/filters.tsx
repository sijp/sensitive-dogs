import React from "react";

import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Checkbox,
  IconButton,
  NativeSelect,
  Container,
  Box
} from "@mui/material";

import { SensitiveSymbol } from "@sensitive-dogs/icons";

import { services, locations } from "../config";
import { useLocation } from "../hooks/use-location";
import { useServices } from "../hooks/use-services";
import { useFiltersButton } from "../hooks/use-filters-button";

interface FiltersProps {
  onMapClick: () => void;
}

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
        <IconButton
          edge="end"
          aria-label={active ? "remove" : "add"}
          onClick={handler}
        >
          <SensitiveSymbol iconName={active ? "remove" : "add"} />
        </IconButton>
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

export function Filters({ onMapClick }: FiltersProps) {
  const [activeLocation, setLocation] = useLocation();
  const [activeServices, addService, removeService] = useServices();

  const [open, setOpen] = useFiltersButton();

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
      >
        <List sx={{ minWidth: "40vw" }}>
          <ListItem>
            <ListItemText primary={"סוג שירות"} />
          </ListItem>
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
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary={"איזור מגורים"} />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label={"map"} onClick={onMapClick}>
                <SensitiveSymbol iconName={"map"} />
              </IconButton>
            }
          >
            <NativeSelect
              defaultValue={activeLocation}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
              sx={{ width: "100%" }}
            >
              <option value="">הכל</option>
              {Object.entries(locations)
                .sort(([_locationIdA, locationA], [_locationIdB, locationB]) =>
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
        </List>
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
