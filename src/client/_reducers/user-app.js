import { GET_USER_APP } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false,
};

const userApp = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_USER_APP}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_USER_APP}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case `${GET_USER_APP}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default userApp;
