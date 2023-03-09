import Button from "@mui/material/Button";
import React from "react";
import { DataContext } from "@sensitive-dogs/app/App";

export default function HomePage() {
  const data = React.useContext(DataContext);
  return (
    <>
      <Button variant="contained">Click Me!</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
