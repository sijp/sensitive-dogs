jest.mock("@sensitive-dogs/event-bus", () => ({
  __esModule: true,
  ...jest.requireActual("@sensitive-dogs/event-bus")
}));

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DataContext } from "@sensitive-dogs/app/App";
import * as eventBus from "@sensitive-dogs/event-bus";

import Navigation from "..";

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

    it("should emit navigation event after clicking a link", async () => {
      const dispatch = jest.fn();
      const spy = jest
        .spyOn(eventBus, "useDispatch")
        .mockImplementation(() => dispatch);
      const { findByTestId } = render(
        //@ts-ignore
        <DataContext.Provider value={baseData}>
          <Navigation route="/" />
        </DataContext.Provider>
      );
      const link = await findByTestId("navlink-1");
      fireEvent.click(link);
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith(["/professionals", "Professionals"]);

      spy.mockRestore();
    });

    it("should open the drawer when clicking the menu button and closed after clicking a link", async () => {
      const { findByTestId } = render(
        //@ts-ignore
        <DataContext.Provider value={baseData}>
          <Navigation route="/" />
        </DataContext.Provider>
      );
      const drawer = await findByTestId("drawer");

      expect(drawer).toHaveAttribute("aria-hidden", "true");

      const menu = await findByTestId("menu-button");
      fireEvent.click(menu);

      expect(drawer).not.toHaveAttribute("aria-hidden");

      const link = await findByTestId("navlink-1");
      fireEvent.click(link);

      expect(drawer).toHaveAttribute("aria-hidden", "true");
    });
  });
});
