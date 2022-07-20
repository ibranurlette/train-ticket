// import axios from 'axios';
import {
  GET_MYTICKET,
  GET_ONE_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET,
} from "../config/constants";
import { API } from "../config/api";

export const getMyticket = () => {
  return {
    type: GET_MYTICKET,
    payload: async () => {
      const res = await API.get("/Mytickets");
      const data = res.data.data;
      return data;
    },
  };
};

export const getOneTicket = (id) => {
  return {
    type: GET_ONE_TICKET,
    payload: async () => {
      const res = await API.get(`/ticket/${id}`);
      const data = res.data.data;
      return data;
    },
  };
};

export const updateTicket = (ticket) => {
  const { id, data2 } = ticket;
  return {
    type: UPDATE_TICKET,
    payload: async () => {
      const res = await API.put(`/ticket/${id}`, data2);
      const data = res.data.data;
      return data;
    },
  };
};

export const deleteTicket = (id) => {
  return {
    type: DELETE_TICKET,
    payload: async () => {
      const res = await API.delete(`/ticket/${id}`);
      const data = res.data.data;
      return data;
    },
  };
};
