import React, { useState } from "react";
import { connect } from "react-redux";

import Activity from "./components/Activity";
import Favorites from "./components/Favorites";

function App({ activity }) {
  const [favs, setFavs] = useState([]);
  const [favsModule, setFavsModule] = useState(false);

  const handleFavsModule = () => {
    setFavsModule(!favsModule);
    if (localStorage.getItem("favoriteActivities") == null) {
      localStorage.setItem(
        "favoriteActivities",
        `["Hope you enjoy the app! ❤️"]`
      );
    }
    setFavs(JSON.parse(localStorage.getItem("favoriteActivities")));
  };

  const handleAddFavorite = (e) => {
    let storedActivities = JSON.parse(
      localStorage.getItem("favoriteActivities")
    );
    if (storedActivities.includes(activity.activity)) return;
    storedActivities.push(activity.activity);

    localStorage.setItem(
      "favoriteActivities",
      JSON.stringify(storedActivities)
    );
    setFavs(JSON.parse(localStorage.getItem("favoriteActivities")));
  };

  const handleRemoveFavorite = (index) => {
    let storedActivities = JSON.parse(
      localStorage.getItem("favoriteActivities")
    );

    storedActivities.splice(index, 1);

    localStorage.setItem(
      "favoriteActivities",
      JSON.stringify(storedActivities)
    );
    setFavs(JSON.parse(localStorage.getItem("favoriteActivities")));
  };

  return (
    <div className="App">
      <Activity
        handleFavsModule={handleFavsModule}
        handleAddFavorite={handleAddFavorite}
      />
      {favsModule && (
        <Favorites favs={favs} handleRemoveFavorite={handleRemoveFavorite} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    activity: state.activity,
  };
};

export default connect(mapStateToProps)(App);
