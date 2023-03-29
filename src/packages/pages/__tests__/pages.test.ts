import { getPages } from "..";

describe("pages", () => {
  describe("getPages", () => {
    const baseData: Parameters<typeof getPages>[0] = {
      menu: [
        {
          id: "1",
          text: "Professionals",
          url: "/professionals",
          icon: "x",
          highlighted: true,
          // @ts-ignore
          type: "link"
        }
      ],
      articlesMenu: {
        entry: { label: "" },
        parent: { label: "" },
        children: []
      },
      articles: [],
      homePage: {
        title: "website title",
        background: "",
        button_icon: "",
        button_link: "",
        button_text: "",
        logo: "",
        text: ""
      },
      images: [],
      professionals: [],
      team: []
    };
    it("should have the keys index and professional", () => {
      const pages = getPages(baseData);

      expect(pages).toHaveProperty("index");
      expect(pages).toHaveProperty("professionals");
      expect(pages["index"][0]).toBe(baseData.homePage.title);
      expect(pages["professionals"][0]).toBe(
        `${baseData.menu[0].text} :: ${baseData.homePage.title}`
      );
    });

    it("should have the keys for each article", () => {
      const pages = getPages({
        ...baseData,
        articles: [
          {
            metadata: {
              id: "1",
              name: "Article 1"
            },
            article: []
          },
          {
            metadata: {
              id: "2",
              name: "Article 2"
            },
            article: []
          }
        ]
      });

      expect(pages).toHaveProperty("article/1");
      expect(pages).toHaveProperty("article/2");

      expect(pages["article/1"][0]).toBe(
        `Article 1 :: ${baseData.homePage.title}`
      );
      expect(pages["article/2"][0]).toBe(
        `Article 2 :: ${baseData.homePage.title}`
      );
    });
  });
});
