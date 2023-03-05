import { google } from "googleapis";
import { GoogleAuth, auth } from "google-auth-library";
import lodash from "lodash";

import { writeFileFromStream } from "./data-folder";

interface FileData {
  id: string;
  name: string;
  mimeType: string;
  description: string;
}

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.metadata",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.photos.readonly",
  "https://www.googleapis.com/auth/drive.readonly"
];

function authenticate() {
  const keysEnvVar = process.env["GOOGLE_API_CREDS"];
  if (!keysEnvVar) {
    return new GoogleAuth({
      keyFile: "./secrets.json",
      scopes: SCOPES
    });
  }
  const keys = JSON.parse(keysEnvVar);
  const client = auth.fromJSON(keys);
  return client;
}

export default function GoogleAdapter() {
  const client = authenticate();
  const drive = google.drive({ version: "v3", auth: client });

  const listFiles: (id: string) => Promise<FileData[]> = async (id: string) => {
    try {
      let res = await drive.files.list({
        q: `'${id}' in parents`,
        pageSize: 5,
        fields: "nextPageToken, files(id, name, mimeType, description)"
      });
      if (!res.data.files?.length) {
        throw new Error(`Bad or empty image directory`);
      }

      let files = [res.data.files];
      while (res.data.nextPageToken) {
        const pageToken = res.data.nextPageToken;
        res = await drive.files.list({
          q: `'${id}' in parents`,
          pageSize: 5,
          fields: "nextPageToken, files(id, name, mimeType, description)",
          pageToken
        });
        files.push(res.data.files!);
      }

      return lodash.flatten(files) as unknown as FileData[];
    } catch (error) {
      throw new Error(`API Error ${error}`);
    }
  };

  return {
    async getImages() {
      const id = process.env["IMAGES_FOLDER_ID"];
      if (!id) throw "Missing env IMAGES_FOLDER_ID";

      return listFiles(id);
    },

    async download(src: string, target: string) {
      const result = await drive.files.get(
        { fileId: src, alt: "media" },
        { responseType: "stream" }
      );

      return writeFileFromStream(result.data, target);
    }
  };
}
