import React from "react";

type pageComponent = {
  [key: string]: React.FC;
};

const pages: pageComponent = {
  index() {
    return <div>Hello App and the World of Web</div>;
  },
  about() {
    return <div>It's all about sensitive dogs</div>;
  }
};

export default pages;
