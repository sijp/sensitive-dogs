import lodash from "lodash";
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
  interactive?: "youtube" | "spotify" | "spotify-show" | null | undefined;
}

interface RawParagraph {
  type: string | null | undefined;
  elements: ArticleElement[] | undefined;
  bulletType: string | undefined;
  bullet: string | null | undefined;
}

interface Paragraph {
  type: string | null | undefined;
  elements: ArticleElement[] | undefined;
}

interface IndexedParagraph extends Paragraph {
  index: number;
}

interface List {
  type: "LIST";
  bulletType: string;
  paragraphs: Paragraph[];
}

interface IndexedList extends List {
  index: number;
}

type ParsedDocument = Array<Paragraph | List> | null;

function maybeConvertToInteractive(element: ArticleElement): ArticleElement {
  const youtube = (element.text || "").match(
    /https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/
  );
  const spotify = (element.text || "").match(
    /https:\/\/open\.spotify\.com\/episode\/([\w-]+)/
  );
  const spotifyShow = (element.text || "").match(
    /https:\/\/open\.spotify\.com\/show\/([\w-]+)/
  );

  return {
    ...element,
    ...(youtube ? {
      link: `https://www.youtube.com/embed/${youtube[1]}`,
      interactive: "youtube"
    } : spotify ? {
      link: `https://open.spotify.com/embed/episode/${spotify[1]}`,
      interactive: "spotify"
    } : spotifyShow ? {
      link: `https://open.spotify.com/embed/show/${spotifyShow[1]}`,
      interactive: "spotify-show"
    } : null)
  }
}

function groupBulletedLists(paragraphs: RawParagraph[]) {
  const cleanedParagraphs = paragraphs.map((paragraph, index) => ({
    ...paragraph,
    index
  }));
  const listGroups = lodash.groupBy(
    cleanedParagraphs,
    (paragraph) => paragraph.bullet || paragraph.index
  );

  const indexedGroups = Object.entries(listGroups).map(
    ([index, paragraphs]) => {
      if (paragraphs.length === 1) {
        return [index, paragraphs[0]] as [string, IndexedParagraph];
      }
      return [
        index,
        {
          index: 0,
          type: "LIST",
          bulletType: paragraphs[0].bulletType || "ul",
          paragraphs: paragraphs.map(
            ({
              index: _index,
              bullet: _bullet,
              bulletType: _bulletType,
              ...p
            }) => p
          )
        }
      ] as [string, IndexedList];
    }
  );

  const tree = indexedGroups.reduce<
    Record<string, IndexedList | IndexedParagraph>
  >((memo, [index, group]) => {
    return { ...memo, [index]: group };
  }, {});

  const ret = lodash
    .uniqBy(
      cleanedParagraphs,
      (paragraph) => paragraph.bullet || paragraph.index
    )
    .map(({ bullet, bulletType: _bulletType, ...paragraph }) => {
      if (!bullet) return paragraph as Paragraph;
      const { index: _index, ...list } = tree[bullet] as IndexedList;
      return list as List;
    });

  return ret;
}

export function parseDocument(
  doc: ArticleContent,
  imagesIdMapper: { [key: string]: string }
): ParsedDocument {
  const { lists = {} } = doc;
  if (!doc.body?.content || !Array.isArray(doc.body.content)) return null;

  const paragraphs = doc.body.content.map(({ paragraph }) => {
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
            horizontalRule,
            richLink
          }) => {
            const { content, textStyle = {} } = textRun;
            const { italic, underline, bold, link: textLink } = textStyle;
            const { inlineObjectId, textStyle: inlineTextStyle } =
              inlineObjectElement;
            const { link: imageLink } = inlineTextStyle || {};
            const highQualityImageId = richLink?.richLinkProperties?.title;

            return maybeConvertToInteractive({
              text: content,
              italic,
              underline,
              bold,
              link: (textLink || imageLink)?.url,
              image: highQualityImageId || imagesIdMapper[inlineObjectId || ""],
              floatImages: positionedObjectIds?.map((id) => imagesIdMapper[id]),
              horizontalLine: !!horizontalRule
            });
          }
        )
      };
    }
    return null;
  });

  return groupBulletedLists(lodash.compact(paragraphs));
}
