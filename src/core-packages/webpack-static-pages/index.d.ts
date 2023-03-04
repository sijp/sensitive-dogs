import HtmlWebpackPlugin from "html-webpack-plugin";

export function getPages(
  pageNames: string[],
  render: () => string
): HtmlWebpackPlugin[];
