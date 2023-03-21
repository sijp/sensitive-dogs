import React from "react";

import HomePage from "@sensitive-dogs/home-page";
import ArticlePage from "@sensitive-dogs/article-page";
import SensitiveThemeProvider from "@sensitive-dogs/sensitive-theme";
import { DataContext } from "@sensitive-dogs/app/App";
import { ProcessedDataType } from "@sensitive-dogs/data-processor";

type pagesComponent = {
  [key: string]: [string, React.FC];
};

function getArticlePages(
  articles: Array<{ metadata: { id: string; name: string } }>,
  websiteTitle: string
) {
  return Object.fromEntries(
    articles.map(({ metadata }) => [
      `article/${metadata.id}`,
      [
        `${metadata.name} :: ${websiteTitle}`,
        () => (
          <SensitiveThemeProvider>
            <ArticlePage articleId={metadata.id} />
          </SensitiveThemeProvider>
        )
      ]
    ])
  );
}

export function getPages(data: ProcessedDataType) {
  const { articles, homePage, menu } = data;
  const websiteTitle = homePage.title || "";

  const professionalsTitle =
    menu.find((entry) => entry.url === "/professionals")?.text || "";

  const pages: pagesComponent = {
    index: [
      websiteTitle,
      () => {
        return (
          <SensitiveThemeProvider>
            <HomePage />
          </SensitiveThemeProvider>
        );
      }
    ],
    professionals: [
      `${professionalsTitle} :: ${websiteTitle}`,
      () => {
        return (
          <SensitiveThemeProvider>
            <HomePage />
          </SensitiveThemeProvider>
        );
      }
    ],
    ...getArticlePages(articles, websiteTitle)
  };
  return pages;
}

export default function usePages() {
  const data = React.useContext(DataContext);

  if (!data) return {};

  const pages: pagesComponent = React.useMemo<pagesComponent>(
    () => getPages(data),
    []
  );
  return pages;
}
