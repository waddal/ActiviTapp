import React, { useState } from "react";

const Favorites = ({ favs, handleRemoveFavorite }) => {
  const [selected, setSelected] = useState();

  const getClassName = (index) => {
    return (index = index === selected ? "selected" : "");
  };

  const markSelectedId = (index) => {
    selected === index ? setSelected(null) : setSelected(index);
  };

  return (
    <div data-testid="favoritesContainer" className="favoritesContainer">
      <div className="favoritesList">
        {favs
          .filter((item) => item)
          .map((activity, index) => {
            return (
              <div
                key={index}
                className={`favoritesListItem ${getClassName(index)}`}
                onPointerDown={() => markSelectedId(index)}
              >
                <p data-testid="favoriteItem">{activity}</p>
                {selected === index && (
                  <div
                    data-testid="deleteButton"
                    className="tab actionButton"
                    onPointerDown={() => handleRemoveFavorite(index)}
                  ></div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
