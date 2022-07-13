import {AUTH} from '../config/constants';
import {API} from '../config/api';

export const register = data => {
  return {
    type: AUTH,
    payload: async () => {
      	const res = await API.post("/register", data);
      	const {token} = res.data;
      	 localStorage.setItem("token", token);
      	 return res.data;
    }

  };
};