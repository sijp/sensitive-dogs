import Webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

import webpackConfig from "../../../webpack.config";

import webpackStaticPages from "@sensitive-dogs/webpack-static-pages";
import render from "@sensitive-dogs/app/render";
import pages from "@sensitive-dogs/pages";
import { processData } from "@sensitive-dogs/data-processor";

async function build() {
  const { images, ...data } = await processData();
  // @ts-ignore
  process.env["__DATA__"] = data;

  const plugins = [
    ...webpackStaticPages((route: string) => render(route, data))(
      Object.keys(pages)
    ),
    new Webpack.DefinePlugin({
      "process.env.__DATA__": JSON.stringify(process.env["__DATA__"])
    })
  ];

  const compiler = Webpack({
    ...webpackConfig,
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    },
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
}

build();
