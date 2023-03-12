import { styled } from "@mui/material/styles";

const ParallaxHeaderBox = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transform-style: preserve-3d;
  z-index: -1;
`;

const ParallaxBackground = styled("div")({
  transform: "translateZ(-5px) scale(1.51)",
  position: "absolute",
  height: "100%",
  width: "100%",
  objectFit: "cover",
  zIndex: -2
});

const ParallaxForeground = styled("div")({
  position: "absolute",
  height: "100%",
  width: "100%",
  zIndex: -1
});

export function ParallaxHeader(
  props: React.PropsWithChildren<{ background: string }>
) {
  return (
    <ParallaxHeaderBox>
      <ParallaxBackground
        sx={{
          backgroundImage: `url(${props.background})`,
          backgroundSize: "cover",
          backgroundPosition: ["70% 50%", "70% 50%", "70% 50%", "50% 70%"],
          backgroundRepeat: "no-repeat"
        }}
      />
      {props.children ? (
        <ParallaxForeground>{props.children}</ParallaxForeground>
      ) : null}
    </ParallaxHeaderBox>
  );
}
