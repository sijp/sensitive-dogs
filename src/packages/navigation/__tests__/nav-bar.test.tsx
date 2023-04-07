import { render, fireEvent } from "@testing-library/react";

import { MenuContext } from "..";
import { DataContext } from "@sensitive-dogs/app/App";
import NavBar from "../components/nav-bar";

describe("navigation", () => {
  describe("nav-bar", () => {
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
      articlesMenu: {},
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
    it("should navigate after click", async () => {
      const closeDrawer = jest.fn();
      const navigate = jest.fn();
      const openDrawer = jest.fn();
      const { findByTestId } = render(
        //@ts-ignore
        <DataContext.Provider value={baseData}>
          <MenuContext.Provider
            value={[
              { drawer: { open: false } },
              { closeDrawer, navigate, openDrawer }
            ]}
          >
            <NavBar />
          </MenuContext.Provider>
        </DataContext.Provider>
      );

      const link = await findByTestId("navlink-1");
      fireEvent.click(link);
      expect(navigate).toBeCalledTimes(1);
      expect(navigate).toBeCalledWith("/professionals", "Professionals");
    });
  });
});
