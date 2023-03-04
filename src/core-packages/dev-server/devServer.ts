import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import webpackConfig from "../../../webpack.config";

import { getPages } from "@sensitive-dogs/webpack-static-pages";
import render from "../app/render";

const compiler = Webpack({
  ...webpackConfig,
  entry: `../../../${webpackConfig.entry}`,
  mode: "development",
  plugins: [...getPages(["Index"], () => render("Index"))]
});

const devServerOptions = {
  static: false,
  port: 3000,
  devMiddleware: {
    publicPath: "http://localhost:3000/dist/"
  },
  hot: true,
  proxy: {
    "*": "http://localhost:3000/dist/index.html"
  }
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
