// import axios from 'axios';
import {AUTH} from '../config/constants';
import {API} from '../config/api';


export const login = data => {
  return {
    type: AUTH,
    payload: async () => {
      const res = await API.post("/login", data);
      const {token} = res.data;
      localStorage.setItem("token", token);
      return res.data;
    }
  };
};
