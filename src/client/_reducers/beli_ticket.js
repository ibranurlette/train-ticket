import { BELI_TICKET } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${BELI_TICKET}_PENDING`:
      return {
        ...state,
          loading: true
      };
    case `${BELI_TICKET}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      };
    case `${BELI_TICKET}_REJECTED`:
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
