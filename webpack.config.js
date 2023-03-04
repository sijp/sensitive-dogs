const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/core-packages/app/index.tsx"),
  mode: "development",
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
        use: ["style-loader", "css-loader"]
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
