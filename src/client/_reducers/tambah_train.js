import { TAMBAH_TRAIN } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${TAMBAH_TRAIN}_PENDING`:
      return {
        ...state,
          loading: true
      };
    case `${TAMBAH_TRAIN}_FULFILLED`:
      return {
        ...state,
          loading: false,
        data: action.payload,
        error: false,
      };
    case `${TAMBAH_TRAIN}_REJECTED`:
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
