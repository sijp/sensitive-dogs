import React from "react";

import { ParallaxHeader } from "@sensitive-dogs/common";
import { DataContext } from "@sensitive-dogs/app/App";

export default function Header() {
  const data = React.useContext(DataContext);

  if (!data) return null;

  return (
    <ParallaxHeader background={`public/${data.homePage.background}`}>
      <div
        style={{
          width: 150,
          height: 150,
          backgroundColor: "grey",
          color: "white"
        }}
      >
        <h1>Hello</h1>
      </div>
    </ParallaxHeader>
  );
}
