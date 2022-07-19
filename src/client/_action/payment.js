// import axios from 'axios';
import { GET_PAYMENT, DETAIL_PAYMENT } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getPayment = (search) => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return {
    type: GET_PAYMENT,
    payload: async () => {
      const res = await API.get(`/payments?status=${search}`);
      const data = res.data;
      return data;
    },
  };
};

export const detailPayment = (id) => {
  return {
    type: DETAIL_PAYMENT,
    payload: async () => {
      const res = await API.get(`/payment/${id}`);
      const data = res.data.data;
      return data;
    },
  };
};
