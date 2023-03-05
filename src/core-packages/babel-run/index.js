require("ignore-styles");
require("@babel/register")({
  ignore: [/(node_module)/],
  extensions: [".ts", ".tsx", ".js", ".jsx"],
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic"
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: ["@babel/plugin-transform-runtime"]
});

const packageName = process.argv[2];

if (packageName) {
  require(`../${packageName}/index.ts`);
} else {
  console.error("Missing packageName to run");
}
