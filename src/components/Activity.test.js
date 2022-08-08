import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from "../reducers";
import Activity from "./Activity";

let store = createStore(reducer);

// mock action getActivity
const getActivity = jest.fn();
getActivity.mockReturnValue({
  activity: "Volunteer at a local animal shelter",
  availability: 0.5,
  type: "charity",
  participants: 1,
  price: 0.1,
  accessibility: "Minor challenges",
  duration: "hours",
  kidFriendly: true,
  link: "",
  key: "1382389",
});

test("Activity component renders without error", () => {
  render(
    <Provider store={store}>
      <Activity />
    </Provider>
  );
});

describe("Activity component tests", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "favoriteActivities",
      `["Hope you enjoy the app! ❤️"]`
    );
    store = createStore(reducer);
    act(() => {
      render(
        <Provider store={store}>
          <Activity />
        </Provider>
      );
    });
  });
  describe("Card component tests", () => {
    test("Instructional card visible when component mounts", async () => {
      const title = await screen.findByText(/Tap/i);
      expect(title).toBeTruthy();
      const favListInstruction = await screen.findByText(/favorites list/i);
      expect(favListInstruction).toBeTruthy();
      const addFavInstruction = await screen.findByText(/add favorite/i);
      expect(addFavInstruction).toBeTruthy();
    });

    // test("Random activity is generated when user taps card", async () => {
    //   const card = await screen.findByTestId("activityCard");
    //   expect(card).toBeTruthy();
    //   userEvent.click(card);
    //   const activity = await screen.findByText(/activity/i);
    //   expect(activity).toBeTruthy();
    // });
  });

  describe("Tab button tests", () => {
    test("Socials tab exists", async () => {
      const socialsTab = await screen.findByTestId("socialTab");
      expect(socialsTab).toBeTruthy();
    });

    test("List tab exists", async () => {
      const listTab = await screen.findByTestId("listTab");
      expect(listTab).toBeTruthy();
    });

    // test("List contains welcoming message in localStorage", () => {});

    test("Social tab exists", async () => {
      const socialTab = await screen.findByTestId("socialTab");
      expect(socialTab).toBeTruthy();
    });
  });
});
// local strage contains a favorite item
// heart link correctly redirects client to social site
// favorite an activity adds an item to local storage
// list displays favorites correctly
