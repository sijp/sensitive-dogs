import { Box, Container } from "@mui/material";
import Article from "@sensitive-dogs/article";
import React from "react";
import { DataContext } from "@sensitive-dogs/app/App";
import { FixedBackgroundBox } from "@sensitive-dogs/common";
import { useListener } from "@sensitive-dogs/event-bus";

export default function Footer({ route = "/" }: { route: string | undefined }) {
  const data = React.useContext(DataContext);
  const [eventRoute] = useListener<[string, string]>("app.navigate") || [
    route === "/" ? "/index" : route,
    ""
  ];

  if (!data || eventRoute === "/professionals") return <></>;

  return (
    <>
      <FixedBackgroundBox
        height="50vh"
        background="/public/embedded-image-3.jpeg"
        backgroundPosition="10vh"
      ></FixedBackgroundBox>
      <Box
        sx={{
          bgcolor: "primary.dark",
          display: "flex",

          color: "grey.900",
          padding: 2,
          minHeight: "15vh",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Container maxWidth="md">
          <Article articleId="disclaimer" />
        </Container>
      </Box>
    </>
  );
}
