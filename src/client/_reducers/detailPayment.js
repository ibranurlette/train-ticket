import { DETAIL_PAYMENT } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${DETAIL_PAYMENT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${DETAIL_PAYMENT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case `${DETAIL_PAYMENT}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
