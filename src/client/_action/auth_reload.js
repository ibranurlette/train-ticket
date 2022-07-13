// import axios from 'axios';
import {AUTH_RELOAD} from '../config/constants';
import {API,setAuthToken} from '../config/api';


export const authReload = () => {
  return {
    type: AUTH_RELOAD,
    payload: async () => {
      setAuthToken();
      const res = await API.get("/auth");
      const { data } = res.data;
      return data;
    }
  };
};
