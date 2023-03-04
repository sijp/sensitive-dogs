import Webpack from "webpack";
import webpackConfig from "../../../webpack.config";

import webpackStaticPages from "@sensitive-dogs/webpack-static-pages";
import render from "@sensitive-dogs/app/render";
import pages from "@sensitive-dogs/pages";

const plugins = webpackStaticPages(render)(Object.keys(pages));

const compiler = Webpack({
  ...webpackConfig,
  mode: "production",
  plugins
});

compiler.run((err, result) => {
  if (err) {
    return console.log(err.message);
  }

  result?.compilation.compiler.close(
    (closeErr) => closeErr && console.log(closeErr.message)
  );
  console.log(result?.toString());
});
