import googleDoc from "../__mocks__/google-doc.mock";

jest.mock("@sensitive-dogs/google-drive/src/google-adapter", () => ({
  __esModule: true,
  MIMETYPES: {
    FOLDER: "application/vnd.google-apps.folder",
    ARTICLE: "application/vnd.google-apps.document",
    SCHEMA: "application/vnd.google-apps.spreadsheet",
    IMAGE: "image/jpeg",
    IMAGE_PNG: "image/png"
  },
  default: () => ({
    getImages() {
      return [
        {
          id: "1",
          name: "image1",
          mimeType: "image/jpeg",
          description: "image1"
        },
        {
          id: "2",
          name: "image2",
          mimeType: "image/jpeg",
          description: "image2"
        }
      ];
    },
    getArticles() {
      return [
        {
          id: "3",
          name: "article3",
          mimeType: "application/vnd.google-apps.document",
          description: "article-description-3"
        },
        {
          id: "4",
          name: "article4",
          mimeType: "application/vnd.google-apps.document",
          description: "article-description-4"
        }
      ];
    },
    getArticleInfo() {
      return {
        id: "10",
        name: "root-folder",
        mimeType: "application/vnd.google-apps.folder",
        description: "root-folder-description",
        children: [
          {
            id: "11",
            name: "folder-11",
            mimeType: "application/vnd.google-apps.folder",
            description: "folder-description-11",
            children: [
              {
                id: "3",
                name: "article3",
                mimeType: "application/vnd.google-apps.document",
                description: "article-description-3"
              }
            ]
          },
          {
            id: "12",
            name: "folder-12",
            mimeType: "application/vnd.google-apps.folder",
            description: "folder-description-12",
            children: [
              {
                id: "4",
                name: "article4",
                mimeType: "application/vnd.google-apps.document",
                description: "article-description-4"
              }
            ]
          }
        ]
      };
    },
    download(src: { mimeType: string }) {
      if (src.mimeType === "image/jpeg") return "image";
      if (src.mimeType === "application/vnd.google-apps.document")
        return googleDoc;
      if (src.mimeType === "application/vnd.google-apps.spreadsheet")
        return [
          ["col1", "col2"],
          ["d11", "d12"],
          ["d21", "d22"]
        ];
      return null;
    },
    getDB() {
      return [
        {
          id: "5",
          name: "team",
          mimeType: "application/vnd.google-apps.spreadsheet",
          description: "database-description-5"
        },
        {
          id: "6",
          name: "professionals",
          mimeType: "application/vnd.google-apps.spreadsheet",
          description: "database-description-6"
        },
        {
          id: "7",
          name: "home-page",
          mimeType: "application/vnd.google-apps.spreadsheet",
          description: "database-description-7"
        },
        {
          id: "8",
          name: "menu",
          mimeType: "application/vnd.google-apps.spreadsheet",
          description: "database-description-8"
        }
      ];
    },
    getEmbeddedImages() {
      return [];
    }
  })
}));

import { processData } from "..";

describe("data-processor", () => {
  describe("processData", () => {
    it("should not crash", async () => {
      await expect(processData()).resolves.not.toThrowError();
    });
    it("should match snapshot", async () => {
      await expect(processData()).resolves.toMatchSnapshot();
    });
  });
});
