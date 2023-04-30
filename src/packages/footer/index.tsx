import { Box, Container } from "@mui/material";
import Article from "@sensitive-dogs/article";
import React from "react";
import { DataContext } from "@sensitive-dogs/app/App";
import { FixedBackgroundBox } from "@sensitive-dogs/common";

export default function Footer() {
  const data = React.useContext(DataContext);

  if (!data) return <></>;

  return (
    <>
      <FixedBackgroundBox
        height="50vh"
        background="/public/embedded-image-5.jpeg"
        backgroundPosition="10vh"
      ></FixedBackgroundBox>
      <Box
        sx={{
          bgcolor: "primary.dark",
          display: "flex",

          color: "grey.900",
          padding: 2,
          paddingBottom: 10,
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
