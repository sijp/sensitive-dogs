import processor from "@sensitive-dogs/google-drive";
import { parseDocument } from "./articles";
import { processProfessionalRecord, processTeamRecord } from "./database";

const TEAM_TABLE_NAME = "team";
const PROFESSIONALS_TABLE_NAME = "professionals";

export async function processData() {
  const proc = await processor();

  const database = proc.processDataBase((metadata, record, columns) =>
    metadata.name === TEAM_TABLE_NAME
      ? processTeamRecord(columns, record)
      : processProfessionalRecord(columns, record)
  );

  const teamTable = database.find(
    (table) => table.metadata.name === TEAM_TABLE_NAME
  );
  const professionalsTable = database.find(
    (table) => table.metadata.name === PROFESSIONALS_TABLE_NAME
  );

  if (!teamTable) throw "Team table is missing";
  if (!professionalsTable) throw "Professional table is missing";

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

  const articles = proc.processArticles((metadata, article) => ({
    metadata: {
      id: metadata.name
    },
    article: parseDocument(article)
  }));

  return {
    menu,
    articles,
    teamTable,
    professionalsTable,
    images: proc.getImageStreams()
  };
}
