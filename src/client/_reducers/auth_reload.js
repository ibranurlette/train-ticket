import { AUTH_RELOAD } from "../config/constants";

// Setup Reducer for Redux
const initialState = {
  data: [],
  authenticated: false,
  error:null,
  isLogin:false,
  loading: false
};

const authReload = (state = initialState, action) => {
  switch (action.type) {
    case `${AUTH_RELOAD}_PENDING`:
      return {
        ...state,
        error:null,
        loading: true
      };
    case `${AUTH_RELOAD}_FULFILLED`:
      return {
        ...state,
        authenticated: true,
        data: action.payload,
        error:null,
        isLogin:true,
        loading:false,
      };
    case `${AUTH_RELOAD}_REJECTED`:
      return {
        ...state,
         loading:false,
        error: false
      };
    default:
      return state;
  }
};

export default authReload;
