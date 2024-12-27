import { CSSProperties } from "react";

import "material-symbols/outlined.css";

import facebook from "@mui/icons-material/Facebook";
import whatsapp from "@mui/icons-material/WhatsApp";
import instagram from "@mui/icons-material/Instagram";
import home from "@mui/icons-material/Home";
import info from "@mui/icons-material/Info";
import person_search from "@mui/icons-material/PersonSearch";
import menu from "@mui/icons-material/Menu";
import filter_alt from "@mui/icons-material/FilterAlt";
import favorite from "@mui/icons-material/Favorite";
import local_police from "@mui/icons-material/LocalPolice";
import shield from "@mui/icons-material/Shield";
import video_camera_front from "@mui/icons-material/VideoCameraFront";

const materialIcons: Record<string, typeof facebook> = {
  facebook,
  whatsapp,
  instagram,
  home,
  info,
  person_search,
  menu,
  filter_alt,
  favorite,
  local_police,
  shield,
  video_camera_front
};
export function SensitiveSymbol({
  iconName,
  style = {},
  variant = "solid"
}: {
  iconName: string;
  variant?: "solid" | "regular";
  style?: CSSProperties;
}) {
  const icon = iconName.toLowerCase();
  if (variant === "solid" && icon in materialIcons) {
    const MuiIcon = materialIcons[icon];
    return (
      <MuiIcon
        style={{
          ...style
        }}
      />
    );
  }

  return (
    <span
      className="material-symbols-outlined"
      style={{
        ...style,
        fontVariationSettings: `'FILL' ${variant === "solid" ? 1 : 0}`
      }}
    >
      {icon}
    </span>
  );
}
