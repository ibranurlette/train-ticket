// import axios from 'axios';
import {GET_PAYMENT} from '../config/constants';
import {API, setAuthToken} from '../config/api';


export const getPayment = () => {
	const token = localStorage.getItem("token")
    setAuthToken(token);
  return {
    type: GET_PAYMENT,
    payload: async () => {
      const res = await API.get("/payments");
      const data  = res.data;
      return data;
    }
  };
};

