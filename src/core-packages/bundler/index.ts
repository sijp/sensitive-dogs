import Webpack from "webpack";

import TerserPlugin from "terser-webpack-plugin";
import WebpackDevServer from "webpack-dev-server";

import webpackConfig from "../../../webpack.config";

import webpackStaticPages from "./webpack-static-pages";
import render from "@sensitive-dogs/app/render";
import pages from "@sensitive-dogs/pages";
import { processData } from "@sensitive-dogs/data-processor";
import { StreamDownloaderPlugin } from "./webpack-stream-downloader-plugin";

async function getWebpackConfiguration() {
  const { images, ...data } = await processData();

  const plugins = [
    new Webpack.DefinePlugin({
      "process.env.__DATA__": JSON.stringify(data)
    }),
    new StreamDownloaderPlugin(images),
    ...webpackStaticPages((route: string) => render(route, data))(
      Object.keys(pages)
    )
  ];

  return {
    ...webpackConfig,
    plugins
  };
}

async function build() {
  const config = await getWebpackConfiguration();
  const compiler = Webpack({
    ...config,
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
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
}

const runServer = async () => {
  const config = await getWebpackConfiguration();
  const compiler = Webpack({
    ...config,
    mode: "development"
  });

  const devServerOptions: WebpackDevServer.Configuration = {
    static: false,
    port: 3000,
    devMiddleware: {
      publicPath: "/"
    },
    hot: true
  };

  const server = new WebpackDevServer(devServerOptions, compiler);
  console.log("Starting server...");
  await server.start();
};

switch (process.argv[3]) {
  case "prod":
    build();
    break;
  case "dev":
    runServer();
    break;
  default:
    console.log("Unknown command", process.argv[3]);
    break;
}
