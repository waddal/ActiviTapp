import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import createTestStore from "../utils/tests/CreateTestStore";
import Activity from "../components/Activity";

afterEach(cleanup);
// create test store
let store = createTestStore();

test("Activity component renders without error", () => {
  render(
    <Provider store={store}>
      <Activity />
    </Provider>
  );
});

test("Instructional card visible when component mounts", async () => {
  render(
    <Provider store={store}>
      <Activity />
    </Provider>
  );
  const title = screen.queryByText(/Tap/i);
  expect(title).toBeTruthy();
  const favListInstruction = await screen.findByText(/favorites list/i);
  expect(favListInstruction).toBeTruthy();
  const addFavInstruction = await screen.findByText(/add favorite/i);
  expect(addFavInstruction).toBeTruthy();
});

test("Random activity is generated when user taps card", async () => {
  render(
    <Provider store={store}>
      <Activity />
    </Provider>
  );
  const card = await screen.findByTestId("activityCard");
  expect(card).toBeTruthy();
  userEvent.click(card);
  const activity = await screen.findByText(/activity/i);
  expect(activity).toBeTruthy();
  const participants = await screen.findByText(/participants/i);
  expect(participants).toBeTruthy();
});

test("All tabs exist", async () => {
  render(
    <Provider store={store}>
      <Activity />
    </Provider>
  );
  const socialsTab = await screen.findByTestId("socialTab");
  expect(socialsTab).toBeTruthy();

  const listTab = await screen.findByTestId("listTab");
  expect(listTab).toBeTruthy();

  const socialTab = await screen.findByTestId("socialTab");
  expect(socialTab).toBeTruthy();
});
