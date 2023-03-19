import { Box } from "@mui/material";

type FixedBackgroundBox = React.PropsWithChildren<{
  background: string;
  height: string;
  backgroundPosition: string;
}>;

export function FixedBackgroundBox({
  background,
  height,
  backgroundPosition,
  children
}: FixedBackgroundBox) {
  return (
    <Box
      sx={{
        backgroundAttachment: ["scroll", "scroll", "fixed"],
        backgroundPosition: ["center", "center", `50% ${backgroundPosition}`],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: height,
        backgroundImage: `url(${background})`
      }}
    >
      {children}
    </Box>
  );
}
