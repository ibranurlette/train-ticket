import { GET_USER_OFFICE } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false,
};

const userOffice = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_USER_OFFICE}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_USER_OFFICE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case `${GET_USER_OFFICE}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default userOffice;
