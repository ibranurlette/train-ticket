import { UPLOAD_PROOF } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${UPLOAD_PROOF}_PENDING`:
      return {
        ...state,
          loading: true
      };
    case `${UPLOAD_PROOF}_FULFILLED`:
      return {
        ...state,
          loading: false,
        data: action.payload
      };
    case `${UPLOAD_PROOF}_REJECTED`:
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
