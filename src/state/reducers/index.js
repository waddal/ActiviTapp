import { FETCH_START } from "../actions";
import { FETCH_SUCCESS } from "../actions";
import { FETCH_FAIL } from "../actions";

export const initialState = {
  activity: {
    activity: null,
    type: null,
    participants: null,
    accessability: null,
    key: 1133377,
  },
  isFetching: false,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        activity: action.payload,
        isFetching: false,
      };
    case FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;