import { LIST_STATION } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${LIST_STATION}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${LIST_STATION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case `${LIST_STATION}_REJECTED`:
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
