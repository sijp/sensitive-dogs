jest.mock("@sensitive-dogs/event-bus", () => ({
  __esModule: true,
  ...jest.requireActual("@sensitive-dogs/event-bus")
}));

import Header from "../components/header";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DataContext } from "@sensitive-dogs/app/App";
import * as eventBus from "@sensitive-dogs/event-bus";

describe("home-page", () => {
  describe("header", () => {
    describe("header-cta", () => {
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
          button_link: "/professionals",
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
            <Header />
          </DataContext.Provider>
        );

        const cta = await findByTestId("cta-button");
        fireEvent.click(cta);

        expect(dispatch).toBeCalledWith(["/professionals"]);

        spy.mockRestore();
      });
    });
  });
});
