import React, { useState } from "react";
import { Fab, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";

import { SensitiveSymbol } from "@sensitive-dogs/icons";

const ParallaxContainerRoot = styled("div")({
  height: "100vh",
  overflowY: "auto",
  overflowX: "hidden",
  perspective: "10px",
  direction: "rtl",
  "& > *": {
    direction: "ltr"
  }
});

export function ParallaxContainer(props: React.HTMLAttributes<HTMLDivElement>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const content = ref.current;
    const handler = () => {
      if (content && content.scrollTop > 20) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    content?.addEventListener("scroll", handler);

    return () => {
      content?.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <>
      <ParallaxContainerRoot {...props} ref={ref} />
      <Fade in={isVisible}>
        <Fab
          size="small"
          color="primary"
          aria-label="scroll back to top"
          sx={{ position: "fixed", bottom: 24, left: 24, zIndex: 10 }}
          onClick={() => {
            ref.current?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <SensitiveSymbol iconName="arrow_upward" />
        </Fab>
      </Fade>
    </>
  );
}
