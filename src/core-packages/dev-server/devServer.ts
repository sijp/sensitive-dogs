import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import webpackConfig from "../../../webpack.config";

import webpackStaticPages from "@sensitive-dogs/webpack-static-pages";
import render from "@sensitive-dogs/app/render";
import pages from "@sensitive-dogs/pages";

const plugins = webpackStaticPages(render)(Object.keys(pages));

const compiler = Webpack({
  ...webpackConfig,
  mode: "development",
  plugins
});

const devServerOptions = {
  static: false,
  port: 3000,
  devMiddleware: {
    publicPath: "http://localhost:3000/"
  },
  hot: true,
  proxy: {
    "*": "http://localhost:3000/index.html"
  }
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
