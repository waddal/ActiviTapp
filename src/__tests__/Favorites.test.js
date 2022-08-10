import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Favorites from "../components/Favorites";

afterEach(cleanup);

test("Favorites renders without error", () => {
  const favs = ["Hope you enjoy testing! ❤️"];
  render(<Favorites favs={favs} />);
});

test("Delete button is revealed when favorite activity clicked", () => {
  const favs = ["Hope you enjoy testing! ❤️"];
  render(<Favorites favs={favs} />);

  const favoriteContainer = screen.getByTestId("favoritesContainer");
  expect(favoriteContainer).toBeTruthy();
  const favoriteItem = screen.getByTestId("favoriteItem");
  expect(favoriteItem).toBeTruthy();

  userEvent.click(favoriteItem);
  const deleteButton = screen.getByTestId("deleteButton");
  expect(deleteButton).toBeTruthy();
});

test("Remove favorited activity when delete button is clicked", () => {
  // arrange local storage data
  localStorage.setItem("favoriteActivities", `["Hope you enjoy testing! ❤️"]`);
  let favs = JSON.parse(localStorage.getItem("favoriteActivities"));
  // create mock function
  const handleRemoveFavorite = jest.fn(
    (index) => favs.splice(index, 1),
    localStorage.setItem("favoriteActivities", JSON.stringify(favs))
  );

  render(<Favorites favs={favs} handleRemoveFavorite={handleRemoveFavorite} />);
  // assert favorites container is rendered
  const favoriteContainer = screen.getByTestId("favoritesContainer");
  expect(favoriteContainer).toBeTruthy();
  const favoriteItem = screen.getByTestId("favoriteItem");
  expect(favoriteItem).toBeTruthy();
  // act - when favoriteActivities element is clicked, delete button should appear
  userEvent.click(favoriteItem);
  const deleteButton = screen.getByTestId("deleteButton");
  expect(deleteButton).toBeTruthy();
  // act - button click fires handleRemoveFavorite
  userEvent.click(deleteButton);
  expect(favs).toHaveLength(0);
});
