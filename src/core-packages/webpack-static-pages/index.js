import HtmlWebpackPlugin from "html-webpack-plugin";

export function getPages(pageNames, render) {
  if (!Array.isArray(pageNames))
    throw "Incompatiable page names: must be a list of strings";

  return pageNames.map(
    (page) =>
      new HtmlWebpackPlugin({
        templateParameters: {
          content: render(page),
          title: `Hello ${page}`
        },
        filename: `${page.toLowerCase()}.html`,
        template: "public/template.html"
      })
  );
}
