import React from "react";
import { connect } from "react-redux";

import { getActivity } from "./../actions";
import Emoji from "./Emoji";
import Tabs from "./Tabs";

const Activity = ({
  activity,
  isFetching,
  error,
  getActivity,
  handleFavsModule,
  handleAddFavorite,
}) => {
  const participants = [];

  if (error) {
    return <h2>We have a problem..!{error}</h2>;
  }

  const handleClick = () => {
    getActivity();
  };

  const createType = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const createParticipants = (num) => {
    let peeps = ["🧙‍♀️", "🧙‍♂️", "🧟‍♀️", "🧟", "🧝‍♀️", "🧝", "🦹‍♀️", "🦹‍♂️", "🧛‍♀️", "🧛"];
    for (let i = 0; i <= num; i++) {
      let random = Math.floor(Math.random() * peeps.length);
      participants.push(peeps[random]);
    }
    return participants;
  };

  return (
    <>
      {!isFetching && (
        <div className="activityContainer">
          <div className="activityCard" onPointerDown={() => handleClick()}>
            {!activity.activity && (
              <div className="activityItem">
                <h3>Tap</h3> <span>for an activity!</span>
                <div className="instructionsContainer">
                  <div>
                    <Emoji symbol={"📖"} label={"star"} /> = favorites list
                  </div>
                  <div>
                    <Emoji symbol={"⭐️"} label={"star"} /> = add favorite
                  </div>
                </div>
              </div>
            )}
            {activity.activity && (
              <div className="activityItem">
                <h3>Activity</h3> <span>{activity.activity}</span>
              </div>
            )}
            {activity.type && (
              <div className="activityItem">
                <h3>Type</h3> <span>{createType(activity.type)}</span>
              </div>
            )}
            {activity.participants && (
              <div className="activityItem">
                <h3>Participants</h3>

                <span className="peeps">
                  {createParticipants(activity.participants)}
                </span>
              </div>
            )}
          </div>
          <Tabs
            handleAddFavorite={handleAddFavorite}
            handleFavsModule={handleFavsModule}
          />
        </div>
      )}
      {isFetching && (
        <div className="activityContainer">
          <div className="activityCard">
            <span>...</span>
          </div>
          <div className="tab favoriteButton"></div>
          <div className="tab listButton"></div>
          <div className="tab socialButton"></div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    activity: state.activity,
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(mapStateToProps, { getActivity })(Activity);
