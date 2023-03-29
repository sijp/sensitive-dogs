import { render, fireEvent } from "@testing-library/react";

import { DataContext } from "@sensitive-dogs/app/App";
import Navigation, { reducer } from "..";

jest.mock("@sensitive-dogs/event-bus", () => ({
  __esModule: true,
  ...jest.requireActual("@sensitive-dogs/event-bus")
}));

import * as eventBus from "@sensitive-dogs/event-bus";

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
    it("should emit navigation event after click", async () => {
      const dispatch = jest.fn();
      const spy = jest
        .spyOn(eventBus, "useDispatch")
        .mockImplementation(() => dispatch);

      const { findByTestId } = render(
        //@ts-ignore
        <DataContext.Provider value={baseData}>
          <Navigation />
        </DataContext.Provider>
      );
      const link = await findByTestId("navlink-1");
      fireEvent.click(link);
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith(["/professionals", "Professionals"]);

      spy.mockRestore();
    });
  });
});
