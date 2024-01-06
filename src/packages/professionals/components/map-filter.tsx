import React from "react";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useLocation } from "../hooks/use-location";
import { locations } from "../config";
import { Polygon } from "leaflet";

interface UseLeafletProps {
  id: string;
  activeLocation: string | null;
  onSelect: (location: string) => void;
}

interface MapFilterProps {
  width: number | string;
  height: number | string;
  open: boolean;
  onClose: () => void;
}

async function initMap(id: string) {
  const L = await import("leaflet");
  const map = L.map(id);
  return { L, map };
}

function useLeaflet({ id, activeLocation, onSelect }: UseLeafletProps) {
  const [{ L, map }, setLeaflet] = React.useState<
    Awaited<ReturnType<typeof initMap>> | { L: null; map: null }
  >({ L: null, map: null });
  const [polygons, setPolygons] = React.useState<{ [key: string]: Polygon }>(
    {}
  );

  React.useEffect(() => {
    initMap(id).then(({ L, map }) => {
      setLeaflet({ L, map });
    });
  }, []);

  React.useEffect(() => {
    if (map === null || L === null) return;

    map.setView(
      activeLocation ? locations[activeLocation].polygon[0] : [32, 34.9],
      9
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }).addTo(map);

    setPolygons(
      Object.fromEntries(
        Object.entries(locations).map(([key, location]) => [
          key,
          L.polygon(location.polygon, {
            color: location.lineColor,
            fillColor: location.fillColor
          })
            .bindTooltip(location.label, {
              direction: "top",
              sticky: activeLocation !== key,
              permanent: activeLocation === key
            })
            .on("click", () => {
              onSelect(key);
            })
            .addTo(map)
        ])
      )
    );
  }, [L, map]);

  React.useEffect(() => {
    if (map === null || activeLocation === null) return;
    const activeLocationOptions = locations[activeLocation];
    const activePolygon = polygons[activeLocation];
    map.panTo(activeLocationOptions.polygon[0]);

    if (!activePolygon) return;

    activePolygon.unbindTooltip().bindTooltip(activeLocationOptions.label, {
      direction: "top",
      permanent: true
    });

    return () => {
      activePolygon.unbindTooltip().bindTooltip(activeLocationOptions.label, {
        direction: "top",
        sticky: true
      });
    };
  }, [map, activeLocation, polygons]);
}

export function MapFilter({ width, height, open, onClose }: MapFilterProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeLocation, setLocation] = useLocation();
  useLeaflet({
    id: "map",
    activeLocation,
    onSelect: (location) => {
      setLocation(location);
    }
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      keepMounted
    >
      <DialogTitle id="responsive-dialog-title">
        {"סימון איזור מגורים במפה"}
      </DialogTitle>
      <DialogContent>
        <div
          id="map"
          style={{ width: fullScreen ? "100%" : width, height }}
        ></div>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          alignItems: "stretch"
        }}
      >
        <Button
          autoFocus
          onClick={onClose}
          variant="contained"
          color="secondary"
        >
          שמירה
        </Button>
      </DialogActions>
    </Dialog>
  );
}
