import React from "react";
import { DataContext } from "@sensitive-dogs/app/App";
import { Typography } from "@mui/material";
import { ArticleTextElement } from "./components/article-text-element";
import { ArticleImageElement } from "./components/article-image-element";
import { ArticleHorizontalLineElement } from "./components/article-horizontal-line-element";
import { ArticleYoutubeElement } from "./components/article-youtube-element";
import { ArticleFloatingImageElement } from "./components/article-floating-image-element";
import { ArticleSpotifyElement } from "./components/article-spotify-element";

interface ArticleProps {
  articleId: string;
  elementParsers?: Array<typeof defaultElementParser>;
}

interface ParagraphProps {
  variant: "body1" | "h1" | "h2" | "h3" | "h4" | "h5";
  style: React.CSSProperties;
}

export interface ArticleElementType {
  text?: string | null | undefined;
  italic: boolean | null | undefined;
  underline: boolean | null | undefined;
  bold: boolean | null | undefined;
  link: string | null | undefined;
  image: string | null | undefined;
  floatImages: string[] | null | undefined;
  horizontalLine: boolean | null | undefined;
  interactive?: "youtube" | "spotify" | "spotify-show" | null | undefined;
}

const PARAGRAPH_PROPS: Record<
  string,
  (style: React.CSSProperties) => ParagraphProps
> = {
  NORMAL_TEXT: (style) => ({
    variant: "body1",
    component: "div",
    style: {
      ...style,
      fontSize: "1.2em",
      marginTop: 12
    }
  }),
  HEADING_1: (style) => ({
    variant: "h2",
    style: {
      ...style,
      textAlign: "center",
      clear: "both"
    }
  }),
  HEADING_2: (style) => ({
    variant: "h4",
    style: {
      ...style,
      clear: "both"
    }
  }),
  HEADING_3: (style) => ({
    variant: "h5",
    style: {
      ...style,
      clear: "both"
    }
  })
};

function ArticleParagraph({
  paragraphType,
  children
}: React.PropsWithChildren<{
  paragraphType: string;
}>) {
  const props =
    paragraphType in PARAGRAPH_PROPS
      ? PARAGRAPH_PROPS[paragraphType]
      : PARAGRAPH_PROPS["NORMAL_TEXT"];

  return <Typography {...props({})}>{children}</Typography>;
}

function ArticleListParagraph({
  bulletType,
  children
}: React.PropsWithChildren<{ bulletType: string }>) {
  return bulletType === "ul" ? <ul>{children}</ul> : <ol>{children}</ol>;
}

function defaultElementParser(element: ArticleElementType) {
  const {
    interactive,
    image,
    floatImages,
    horizontalLine,
    text,
    underline,
    bold,
    italic,
    link
  } = element;

  const Linkify: React.FC<React.PropsWithChildren> = ({ children }) =>
    link ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  return interactive === "youtube" && link ? (
    <ArticleYoutubeElement link={link} />
  ) : (interactive === "spotify" || interactive === "spotify-show") && link ? (
    <ArticleSpotifyElement link={link} />)
    : horizontalLine ? (
      <ArticleHorizontalLineElement />
    ) : image ? (
      <Linkify>
        <ArticleImageElement src={image} />
      </Linkify>
    ) : floatImages?.length ? (
      <Linkify>
        <ArticleFloatingImageElement src={floatImages[0]} />
      </Linkify>
    ) : text ? (
      <Linkify>
        <ArticleTextElement
          text={text}
          bold={!!bold}
          underline={!!underline}
          italic={!!italic}
        />
      </Linkify>
    ) : null;
}

export default function Article({
  articleId,
  elementParsers = []
}: ArticleProps) {
  const data = React.useContext(DataContext);
  const article = data?.articles?.find(
    ({ metadata }) => metadata.id === articleId
  )?.article;

  const elementParser = [...elementParsers, defaultElementParser].reduce<
    typeof defaultElementParser
  >(
    (partialParser, nextParser) => (element: ArticleElementType) => {
      const result = partialParser(element);
      return result !== null ? result : nextParser(element);
    },
    (_: ArticleElementType) => null
  );

  if (!article)
    return (
      <>
        `No ${articleId} found, try: $
        {data?.articles.map(({ metadata }) => metadata.id).join(" ")}`
      </>
    );

  return (
    <>
      {article.map((paragraph, pIndex) =>
        "bulletType" in paragraph ? (
          <ArticleListParagraph
            bulletType={paragraph.bulletType}
            key={`list-${pIndex}`}
          >
            {paragraph.paragraphs?.map((listParagraph, lpIndex) => (
              <li key={`list-paragraph-${pIndex}-${lpIndex}`}>
                <ArticleParagraph paragraphType={listParagraph.type || ""}>
                  {listParagraph.elements?.map((element, eIndex) => (
                    <React.Fragment
                      key={`list-paragraph-element-${pIndex}-${lpIndex}-${eIndex}`}
                    >
                      {elementParser(element)}
                    </React.Fragment>
                  ))}
                </ArticleParagraph>
              </li>
            ))}
          </ArticleListParagraph>
        ) : (
          <ArticleParagraph
            paragraphType={paragraph.type || ""}
            key={`paragraph-${pIndex}`}
          >
            {paragraph.elements?.map((element, eIndex) => (
              <React.Fragment key={`paragraph-element-${pIndex}-${eIndex}`}>
                {elementParser(element)}
              </React.Fragment>
            ))}
          </ArticleParagraph>
        )
      )}
    </>
  );
}
