import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

type RenderFnType = (page: string) => string;

function getPages(
  pagesData: string[][],
  render: RenderFnType
): HtmlWebpackPlugin[] {
  if (!Array.isArray(pagesData))
    throw "Incompatiable page names: must be a list of tuples ";

  return pagesData.map(
    ([page, title]) =>
      new HtmlWebpackPlugin({
        cache: false,
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
          title: title.replaceAll('"', "&quot;"),
          path: page === "index" ? "/" : page
        },
        favicon: path.resolve(__dirname, "./public/favicon.ico"),
        filename: `${page === "index" ? "." : page.toLowerCase()}/index.html`,
        template: path.resolve(__dirname, "./public/template.html")
      })
  );
}

export default function webpackStaticPages(render: RenderFnType) {
  return (pagesData: string[][]) => getPages(pagesData, render);
}
