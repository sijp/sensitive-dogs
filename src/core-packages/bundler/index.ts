import Webpack from "webpack";

import TerserPlugin from "terser-webpack-plugin";
import WebpackDevServer from "webpack-dev-server";

import webpackConfig from "../../../webpack.config";

import webpackStaticPages from "./webpack-static-pages";
import render from "@sensitive-dogs/app/render";
import { getPages } from "@sensitive-dogs/pages";
import { processData } from "@sensitive-dogs/data-processor";
import { StreamDownloaderPlugin } from "./webpack-stream-downloader-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

async function getWebpackConfiguration(shouldHydrate: boolean) {
  const pdata = await processData();
  const { images, ...data } = pdata;
  const pageData = Object.entries(getPages(pdata)).map(
    ([pageRoute, [pageTitle]]) => [pageRoute, pageTitle]
  );

  const plugins = [
    new Webpack.DefinePlugin({
      "process.env.__DATA__": JSON.stringify(data)
    }),
    new Webpack.DefinePlugin({
      "process.env.__HYDRATE__": shouldHydrate
    }),
    new StreamDownloaderPlugin(images),
    ...webpackStaticPages((route: string) => render(route, data))(pageData)
  ];

  return {
    ...webpackConfig,
    plugins
  };
}

async function build() {
  const config = await getWebpackConfiguration(true);
  const compiler = Webpack({
    ...config,
    plugins: [
      ...config.plugins,
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false
      })
    ],
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

const runServer = async (shouldHydrate: boolean) => {
  const config = await getWebpackConfiguration(shouldHydrate);
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
    runServer(process.argv[4] !== "--no-hydrate");
    break;
  default:
    console.log("Unknown command", process.argv[3]);
    break;
}
