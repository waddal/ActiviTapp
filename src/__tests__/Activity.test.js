import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import createTestStore from "../state/CreateTestStore";
import Activity from "../components/Activity";

afterEach(cleanup);
// create test store
let store = createTestStore();

describe("Activity component tests", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Activity />
      </Provider>
    );
  });

  test("Activity component renders without error", () => {
    render(
      <Provider store={store}>
        <Activity />
      </Provider>
    );
  });

  test("Instructional card visible when component mounts", async () => {
    const title = await screen.findByText(/Tap/i);
    expect(title).toBeTruthy();
    const favListInstruction = await screen.findByText(/favorites list/i);
    expect(favListInstruction).toBeTruthy();
    const addFavInstruction = await screen.findByText(/add favorite/i);
    expect(addFavInstruction).toBeTruthy();
  });

  test("Random activity is generated when user taps card", async () => {
    const card = await screen.findByTestId("activityCard");
    expect(card).toBeTruthy();
    userEvent.click(card);
    const activity = await screen.findByText(/activity/i);
    expect(activity).toBeTruthy();
    const participants = await screen.findByText(/participants/i);
    expect(participants).toBeTruthy();
  });

  test("Socials tab exists", async () => {
    const socialsTab = await screen.findByTestId("socialTab");
    expect(socialsTab).toBeTruthy();
  });

  test("List tab exists", async () => {
    const listTab = await screen.findByTestId("listTab");
    expect(listTab).toBeTruthy();
  });

  test("Social tab exists", async () => {
    const socialTab = await screen.findByTestId("socialTab");
    expect(socialTab).toBeTruthy();
  });
});

// local strage contains a favorite item
// heart link correctly redirects client to social site
// favorite an activity adds an item to local storage
// list displays favorites correctly
