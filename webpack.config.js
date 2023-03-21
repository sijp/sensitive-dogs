const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env["NODE_ENV"] === "PRODUCTION";

module.exports = {
  entry: path.resolve(__dirname, "./src/core-packages/app/index.tsx"),
  mode: "production",
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript"
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          isProd
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "./"
                }
              }
            : "style-loader",
          "css-loader"
        ],
        sideEffects: true
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader"
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js"
  }
};
