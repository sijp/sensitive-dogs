import React from "react";

type pageComponent = {
  [key: string]: React.FC;
};

const pages: pageComponent = {
  Index() {
    return <div>Hello App and the World of Web</div>;
  }
};

export default pages;
