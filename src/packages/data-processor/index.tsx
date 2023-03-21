import processor from "@sensitive-dogs/google-drive";
import { parseDocument } from "./articles";
import {
  processProfessionalRecord,
  processTeamRecord,
  processHomePageRecord,
  processMenuRecord
} from "./database";

export interface TeamRecord {
  id: string;
  name: string;
  picture: string;
  description: string;
  admin: boolean;
}

export enum MenuRecordTypes {
  LINK = "link",
  ARTICLES = "articles",
  EXTERNAL = "external"
}

export interface MenuRecord {
  id: string;
  text: string;
  url: string;
  icon: string;
  highlighted: boolean;
  type: MenuRecordTypes;
}

export interface ProfessionalRecord {
  id: number;
  firstName: string;
  lastName: string;
  facebookPage: string;
  instagram: string;
  remote: boolean;
  phone: string;
  web: string;
  email: string;
  description: string;
  pinned: boolean;
  cities: string[];
  services: string[];
}

export interface HomePageData {
  background: string | null;
  logo: string | null;
  text: string | null;
  button_text: string | null;
  button_link: string | null;
  button_icon: string | null;
  title: string | null;
}

const TEAM_TABLE_NAME = "team";
const PROFESSIONALS_TABLE_NAME = "professionals";
const HOMEPAGE_TABLE_NAME = "home-page";
const MENU_TABLE_NAME = "menu";

export async function processData() {
  const proc = await processor();

  const database = proc.processDataBase((metadata, record, columns) =>
    metadata.name === TEAM_TABLE_NAME
      ? processTeamRecord(columns, record)
      : metadata.name === PROFESSIONALS_TABLE_NAME
      ? processProfessionalRecord(columns, record)
      : metadata.name === MENU_TABLE_NAME
      ? processMenuRecord(columns, record)
      : metadata.name === HOMEPAGE_TABLE_NAME
      ? processHomePageRecord(columns, record)
      : null
  );

  const teamTable = database.find(
    (table) => table.metadata.name === TEAM_TABLE_NAME
  );
  const professionalsTable = database.find(
    (table) => table.metadata.name === PROFESSIONALS_TABLE_NAME
  );
  const menuTable = database.find(
    (table) => table.metadata.name === MENU_TABLE_NAME
  );
  const homepageTable = database.find(
    (table) => table.metadata.name === HOMEPAGE_TABLE_NAME
  );

  if (!teamTable) throw "Team table is missing";
  if (!professionalsTable) throw "Professional table is missing";
  if (!homepageTable) throw "homepage table is missing";
  if (!menuTable) throw "menu table is missing";

  const team = teamTable.data as unknown as TeamRecord[];
  const professionals = teamTable.data as ProfessionalRecord[];
  const menu = menuTable.data as MenuRecord[];
  const homePage = Object.assign({}, ...homepageTable.data) as HomePageData;

  const articlesMenu = proc.processArticlesMenu((menuEntry) =>
    "children" in menuEntry
      ? {
          label: menuEntry.name
        }
      : {
          label: menuEntry.name,
          path: menuEntry.description
        }
  );
  let embeddedCounter = 0;
  const embeddedImages = proc
    .getEmbeddedImageStreams()
    .map((embeddedImage) => ({
      ...embeddedImage,
      googleId: embeddedImage.id,
      id: `embedded-image-${embeddedCounter++}.jpeg`
    }));

  const mapping = embeddedImages.reduce(
    (memo, next) => ({ ...memo, [next.googleId]: next.id }),
    {}
  );

  const articles = proc.processArticles((metadata, article) => ({
    metadata: {
      name: metadata.name,
      id: metadata.description
    },
    article: parseDocument(article, mapping)
  }));

  return {
    menu,
    articlesMenu,
    articles,
    team,
    professionals,
    homePage,
    images: [...proc.getImageStreams(), ...embeddedImages]
  };
}

export type ProcessedDataType = Awaited<ReturnType<typeof processData>>;
