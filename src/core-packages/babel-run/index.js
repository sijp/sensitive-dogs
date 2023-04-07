require("ignore-styles");
require("@babel/register")({
  extensions: [".ts", ".tsx", ".js", ".jsx"]
});

const packageName = process.argv[2];

if (packageName) {
  require(`../${packageName}/index.ts`);
} else {
  console.error("Missing packageName to run");
}
