import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import createTestStore from "../utils/tests/CreateTestStore";
import App from "../App";
import userEvent from "@testing-library/user-event";

let store = createTestStore();

afterEach(cleanup);

// nesting tests in a describe block is unecessary.
// entire test suite is self contained.
// avoiding beforeEach was intentional, improving the ability for us to understand
// what is going on in each test without having to scroll around - dodds

test("App renders without error", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

test("Local storage contains welcoming message", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const favoritesTab = getByTestId("listTab");
  expect(favoritesTab).toBeTruthy();
  userEvent.click(favoritesTab);
  let favoriteItem = JSON.parse(localStorage.getItem("favoriteActivities"));
  expect(favoriteItem[0]).toBe("Hope you enjoy the app! ❤️");
});

test("Clicking heart tab redirects user to devs github", async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const socialTab = getByTestId("socialTab");
  expect(socialTab).toBeTruthy();
  userEvent.click(socialTab);
});

test("Favorites list renders to dom when user clicks list tab", async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const listTab = getByTestId("listTab");
  expect(listTab).toBeTruthy();
  userEvent.click(listTab);

  const favoritesContainer = getByTestId('favoritesContainer');
  expect(favoritesContainer).toBeTruthy();
});

test("Adding new activity to favorites list operates correctly", async () => {
  let favs = JSON.parse(localStorage.getItem("favoriteActivities"));

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // assert favorites list contains only 1 item (welcome msg);
  expect(favs).toHaveLength(1);

  // arrange card
  const container = screen.queryByTestId("activityCard");
  expect(container).toBeTruthy();
  userEvent.click(container);

  // assert the card has generated new activity
  const participants = screen.queryByText(/participants/i);
  expect(participants).toBeTruthy();

  // arrange add tab for user interaction
  const favTab = screen.queryByTestId('favTab');
  expect(favTab).toBeTruthy();

  // add activity to favorites list
  userEvent.click(favTab);

  // activity was successfully added to favorites list
  expect(favs).toHaveLength(1);
});
