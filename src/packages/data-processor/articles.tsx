import { ArticleContent } from "@sensitive-dogs/google-drive";

interface ArticleElement {
  text: string | null | undefined;
  italic: boolean | null | undefined;
  underline: boolean | null | undefined;
  bold: boolean | null | undefined;
  link: string | null | undefined;
  image: string | null | undefined;
  floatImages: string[] | null | undefined;
  horizontalLine: boolean | null | undefined;
  interactive?: string | null | undefined;
}

function maybeConvertToInteractive(element: ArticleElement) {
  const youtube = (element.text || "").match(
    /https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/
  );
  if (youtube) {
    return {
      ...element,
      link: `https://www.youtube.com/embed/${youtube[1]}`,
      interactive: "youtube"
    };
  }
  return element;
}

export function parseDocument(doc: ArticleContent) {
  const { lists = {} } = doc;
  const paragraphs = doc.body?.content?.map(({ paragraph }) => {
    if (paragraph) {
      const {
        elements,
        paragraphStyle,
        bullet = {},
        positionedObjectIds
      } = paragraph;
      const listProperties = bullet.listId
        ? lists?.[bullet.listId].listProperties?.nestingLevels?.[0]
        : undefined;

      return {
        type: paragraphStyle?.namedStyleType,
        bullet: bullet.listId,
        bulletType: listProperties?.glyphSymbol
          ? "ul"
          : listProperties?.glyphType
          ? "ol"
          : undefined,
        elements: elements?.map(
          ({
            textRun = { textStyle: {} },
            inlineObjectElement = { textStyle: {} },
            horizontalRule
          }) => {
            const { content, textStyle = {} } = textRun;
            const { italic, underline, bold, link: textLink } = textStyle;
            const { inlineObjectId, textStyle: inlineTextStyle } =
              inlineObjectElement;
            const { link: imageLink } = inlineTextStyle || {};

            return maybeConvertToInteractive({
              text: content,
              italic,
              underline,
              bold,
              link: (textLink || imageLink)?.url,
              image: inlineObjectId,
              floatImages: positionedObjectIds,
              horizontalLine: !!horizontalRule
            });
          }
        )
      };
    }
    return null;
  });
  return paragraphs?.filter((p) => p);
}
