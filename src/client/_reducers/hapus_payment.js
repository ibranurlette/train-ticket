import { DELETE_PAYMENT } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${DELETE_PAYMENT}_PENDING`:
      return {
        ...state,
          loading: true
      };
    case `${DELETE_PAYMENT}_FULFILLED`:
      return {
        ...state,
          loading: false,
        data: action.payload
      };
    case `${DELETE_PAYMENT}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
