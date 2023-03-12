import React from "react";

import HomePage from "@sensitive-dogs/home-page";

type pagesComponent = {
  [key: string]: React.FC;
};

const pages: pagesComponent = {
  index() {
    return <HomePage />;
  }
};

export default pages;
