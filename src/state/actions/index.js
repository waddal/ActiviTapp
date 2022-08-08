// import axios from "axios";
// MIXED CONNECTION ERROR
// Mixed Content: The page at 'https://activitapp.herokuapp.com/' was loaded over HTTPS,
// but requested an insecure XMLHttpRequest endpoint 'http://www.boredapi.com/api/activity/'.
// This request has been blocked; the content must be served over HTTPS... AAUGH.. so, a workaround..
import activities from "../../data/index";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";

// 1. RUNS LOCALLY
// export const getActivity = () => {
//   return (dispatch) => {
//     dispatch(fetchStart());
//     axios
//       .get("http://www.boredapi.com/api/activity/")
//       .then((res) => {
//         console.log(res.data);
//         dispatch(fetchSuccess(res.data));
//       })
//       .catch((err) => {
//         dispatch(fetchFail(err));
//       });
//   };
// };

// 2. TEMPORARY PATCH
export const getActivity = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    let random = Math.floor(Math.random() * activities.length);
    dispatch(fetchSuccess(activities[random]));
  };
};

export const fetchStart = () => {
  return { type: FETCH_START };
};

export const fetchSuccess = (activity) => {
  return { type: FETCH_SUCCESS, payload: activity };
};

export const fetchFail = (error) => {
  return { type: FETCH_FAIL, payload: error };
};
