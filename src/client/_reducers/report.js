import { GET_REPORT } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false,
};

const report = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_REPORT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_REPORT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case `${GET_REPORT}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default report;
