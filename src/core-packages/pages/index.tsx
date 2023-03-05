import React from "react";

import HomePage from "@sensitive-dogs/home-page";

type pagesComponent = {
  [key: string]: React.FC;
};

const pages: pagesComponent = {
  index() {
    return <HomePage />;
  },
  about() {
    return <div>It's all about sensitive dogs</div>;
  }
};

export default pages;
