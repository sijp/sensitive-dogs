import processor from "@sensitive-dogs/google-drive";
import { parseDocument } from "./articles";
import {
  processProfessionalRecord,
  processTeamRecord,
  processHomePageRecord
} from "./database";

export interface TeamRecord {
  id: string;
  name: string;
  picture: string;
  description: string;
  admin: boolean;
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
}

const TEAM_TABLE_NAME = "team";
const PROFESSIONALS_TABLE_NAME = "professionals";
const HOMEPAGE_TABLE_NAME = "home-page";

export async function processData() {
  const proc = await processor();

  const database = proc.processDataBase((metadata, record, columns) =>
    metadata.name === TEAM_TABLE_NAME
      ? processTeamRecord(columns, record)
      : metadata.name === PROFESSIONALS_TABLE_NAME
      ? processProfessionalRecord(columns, record)
      : processHomePageRecord(columns, record)
  );

  const teamTable = database.find(
    (table) => table.metadata.name === TEAM_TABLE_NAME
  );
  const professionalsTable = database.find(
    (table) => table.metadata.name === PROFESSIONALS_TABLE_NAME
  );
  const homepageTable = database.find(
    (table) => table.metadata.name === HOMEPAGE_TABLE_NAME
  );

  if (!teamTable) throw "Team table is missing";
  if (!professionalsTable) throw "Professional table is missing";
  if (!homepageTable) throw "homepage table is missing";

  const team = teamTable.data as unknown as TeamRecord[];
  const professionals = teamTable.data as ProfessionalRecord[];

  const homePage = Object.assign({}, ...homepageTable.data) as HomePageData;

  const menu = proc.processMenu((menuEntry) =>
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
    articles,
    team,
    professionals,
    homePage,
    images: [...proc.getImageStreams(), ...embeddedImages]
  };
}

export type ProcessedDataType = Awaited<ReturnType<typeof processData>>;
