import React from "react";

import HomePage from "@sensitive-dogs/home-page";

type pageComponent = {
  [key: string]: React.FC;
};

const pages: pageComponent = {
  index() {
    return <HomePage />;
  },
  about() {
    return <div>It's all about sensitive dogs</div>;
  }
};

export default pages;
