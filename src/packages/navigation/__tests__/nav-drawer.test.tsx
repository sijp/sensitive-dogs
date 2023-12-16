import { render, fireEvent } from "@testing-library/react";

import { MenuContext } from "..";
import { DataContext } from "@sensitive-dogs/app/App";
import NavDrawer from "../components/nav-drawer";

describe("navigation", () => {
  describe("nav-drawer", () => {
    const baseData = {
      menu: [
        {
          id: "1",
          text: "Professionals",
          url: "/professionals",
          icon: "x",
          highlighted: true,
          type: "link"
        },
        {
          id: "2",
          type: "articles"
        }
      ],
      articlesMenu: {
        children: [
          {
            entry: {
              label: "articles"
            },
            children: [{ entry: { label: "article", path: "test" } }]
          }
        ]
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
    it("should navigate and close after click", async () => {
      const closeDrawer = jest.fn();
      const navigate = jest.fn();
      const openDrawer = jest.fn();
      const { findByTestId } = render(
        //@ts-ignore
        <DataContext.Provider value={baseData}>
          <MenuContext.Provider
            value={[
              { drawer: { open: false }, route: "/" },
              { closeDrawer, navigate, openDrawer }
            ]}
          >
            <NavDrawer />
          </MenuContext.Provider>
        </DataContext.Provider>
      );
      const listItemButton = await findByTestId("listitembutton-1");
      fireEvent.click(listItemButton);

      expect(navigate).toBeCalledWith(
        baseData.menu[0].url,
        baseData.menu[0].text
      );

      expect(navigate).toBeCalledTimes(1);
      expect(closeDrawer).toBeCalledTimes(1);
      expect(openDrawer).not.toBeCalled();

      const listArticleFolderButton = await findByTestId(
        "listfolderbutton-articles"
      );
      fireEvent.click(listArticleFolderButton);

      const listArticleButton = await findByTestId("listarticlebutton-article");
      fireEvent.click(listArticleButton);

      expect(navigate).toBeCalledWith("/article/test", "article");

      expect(navigate).toBeCalledTimes(2);
      expect(closeDrawer).toBeCalledTimes(2);
      expect(openDrawer).not.toBeCalled();
    });
  });
});
