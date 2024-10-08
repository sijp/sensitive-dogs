import Webpack from "webpack";

import TerserPlugin from "terser-webpack-plugin";
import WebpackDevServer from "webpack-dev-server";
const CopyPlugin = require("copy-webpack-plugin");

import webpackConfig from "../../../webpack.config";

import webpackStaticPages from "./webpack-static-pages";
import render from "@sensitive-dogs/app/render";
import { getPages } from "@sensitive-dogs/pages";
import { processData } from "@sensitive-dogs/data-processor";
import { StreamDownloaderPlugin } from "./webpack-stream-downloader-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

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
    new CopyPlugin({
      patterns: [
        { from: __dirname + "/public/logo.jpg", to: "./" },
        { from: __dirname + "/public/preview.jpg", to: "./" },
        { from: __dirname + "/public/404.html", to: "./404.html" },
        { from: __dirname + "/public/robots.txt", to: "./robots.txt" }
      ]
    }),
    ...webpackStaticPages((route: string) => render(route, data))(pageData),
    new HtmlWebpackPlugin({
      filename: "./sitemap.xml",
      inject: false,
      templateContent: `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pageData
          .map(
            ([page]) =>
              `<url><loc>https://www.sensitive-dogs.co.il/${
                page === "index" ? "" : page
              }</loc></url>`
          )
          .join("\n")}
      </urlset>
      `
    })
  ];

  return {
    ...webpackConfig,
    plugins
  };
}

async function build() {
  let config;
  try {
    config = await getWebpackConfiguration(true);
  } catch(e) {
    console.error("Error setting up webpack:", e);
    return;
  }
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
  let config;
  try {
    config = await getWebpackConfiguration(shouldHydrate);
  } catch(e) {
    console.error("Error setting up webpack:", e);
    return;
  }
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
