// import axios from 'axios';
import {
  GET_PAYMENT,
  DETAIL_PAYMENT,
  DELETE_PAYMENT,
  BELI_TICKET,
  UPDATE_PAYMENT,
  UPLOAD_PROOF,
} from "../config/constants";
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

export const deletePayment = (id) => {
  return {
    type: DELETE_PAYMENT,
    payload: async () => {
      const res = await API.delete(`/payment/${id}`);
      const data = res.data;
      return data;
    },
  };
};

export const Beli_ticket = (dataTicket) => {
  return {
    type: BELI_TICKET,
    payload: async () => {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      const res = await API.post("/payment", dataTicket);
      const { data } = res.data;
      return data;
    },
  };
};

export const updatePayment = (data) => {
  const { id, train } = data;
  return {
    type: UPDATE_PAYMENT,
    payload: async () => {
      const res = await API.put(`/payment/${id}`, train);
      const { data } = res.data;
      return data;
    },
  };
};

export const uploadProof = (formData, id) => {
  return {
    type: UPLOAD_PROOF,
    payload: async () => {
      const res = await API.post(`/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { data } = res.data;
      return data;
    },
  };
};
