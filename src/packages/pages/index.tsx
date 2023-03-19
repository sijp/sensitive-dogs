import React from "react";

import HomePage from "@sensitive-dogs/home-page";
import SensitiveThemeProvider from "@sensitive-dogs/sensitive-theme";
import { DataContext } from "@sensitive-dogs/app/App";
import { ProcessedDataType } from "@sensitive-dogs/data-processor";
type pagesComponent = {
  [key: string]: [string, React.FC];
};

function getArticlePages(
  articles: Array<{ metadata: { id: string; name: string } }>
) {
  return Object.fromEntries(
    articles.map(({ metadata }) => [
      `article/${metadata.id}`,
      [
        metadata.name,
        () => (
          <SensitiveThemeProvider>
            <HomePage />
          </SensitiveThemeProvider>
        )
      ]
    ])
  );
}

export function getPages(data: ProcessedDataType | null) {
  const { articles = [] } = data || {};
  const pages: pagesComponent = {
    index: [
      "דף ראשי",
      () => {
        return (
          <SensitiveThemeProvider>
            <HomePage />
          </SensitiveThemeProvider>
        );
      }
    ],
    professionals: [
      "מאגר אנשי מקצוע",
      () => {
        return (
          <SensitiveThemeProvider>
            <HomePage />
          </SensitiveThemeProvider>
        );
      }
    ],
    ...getArticlePages(articles)
  };
  return pages;
}

export default function usePages() {
  const data = React.useContext(DataContext);
  const pages: pagesComponent = React.useMemo<pagesComponent>(
    () => getPages(data),
    []
  );
  return pages;
}
