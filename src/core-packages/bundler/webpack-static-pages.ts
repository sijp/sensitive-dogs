import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

type RenderFnType = (page: string) => string;

function getPages(
  pageNames: string[],
  render: RenderFnType
): HtmlWebpackPlugin[] {
  if (!Array.isArray(pageNames))
    throw "Incompatiable page names: must be a list of strings";

  return pageNames.map(
    (page) =>
      new HtmlWebpackPlugin({
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        templateParameters: {
          content: render(page),
          title: `Hello ${page}`
        },
        favicon: path.resolve(__dirname, "./public/favicon.ico"),
        filename: `${page === "index" ? "." : page.toLowerCase()}/index.html`,
        template: path.resolve(__dirname, "./public/template.html")
      })
  );
}

export default function webpackStaticPages(render: RenderFnType) {
  return (pageNames: string[]) => getPages(pageNames, render);
}
