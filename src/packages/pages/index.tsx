import React from "react";

import HomePage from "@sensitive-dogs/home-page";
import ArticlePage from "@sensitive-dogs/article-page";

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
        () => <ArticlePage articleId={metadata.id} />
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
        return <HomePage />;
      }
    ],
    professionals: [
      `${professionalsTitle} :: ${websiteTitle}`,
      () => {
        return <div style={{ minHeight: "100vh" }} />;
      }
    ],
    ...getArticlePages(articles, websiteTitle)
  };
  return pages;
}
