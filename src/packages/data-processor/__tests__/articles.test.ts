import { parseDocument } from "../articles";
import googleDoc from "../__mocks__/google-doc.mock";

describe("data-processor", () => {
  describe("articles", () => {
    describe("parseDocument", () => {
      it("Sholuld return null for content-less doc", () => {
        expect(parseDocument({}, {})).toBeNull();
        expect(parseDocument({ body: {} }, {})).toBeNull();
        // @ts-ignore - docs are runtime inputs, so no static type safety
        expect(parseDocument({ body: { content: " zzz " } }, {})).toBeNull();
      });

      it("Should parse a document", () => {
        expect(
          parseDocument(googleDoc, {
            "kix.abcdefg": "image1",
            "kix.1234567890": "image2"
          })
        ).toMatchSnapshot();
      });
    });
  });
});
