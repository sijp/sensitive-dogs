import React from "react";

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

export function MapFilter({ width, height }: MapFilterProps) {
  const [activeLocation, setLocation] = useLocation();
  useLeaflet({
    id: "map",
    activeLocation,
    onSelect: (location) => {
      setLocation(location);
    }
  });

  return (
    <div id="map" style={{ width, height }}></div>
  );
}
