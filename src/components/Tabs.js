import React from "react";

import Emoji from "./Emoji";

const Tabs = ({ handleAddFavorite, handleFavsModule }) => {
  return (
    <>
      <div
        className="tab favoriteButton"
        onPointerDown={() => handleAddFavorite()}
      >
        <Emoji symbol={"⭐️"} label={"favorite"} />
      </div>
      <div className="tab listButton" onPointerDown={() => handleFavsModule()}>
        <Emoji symbol={"📖"} label={"list"} />
      </div>
      <div className="tab socialButton">
        <a href="https://www.github.com/waddal" alt="❤️" className="social">
          <Emoji symbol={"❤️"} label={"social"} />
        </a>
      </div>
    </>
  );
};

export default Tabs;
