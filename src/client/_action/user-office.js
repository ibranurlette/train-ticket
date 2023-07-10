// import axios from 'axios';
import { GET_USER_OFFICE } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getUsers = () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return {
    type: GET_USER_OFFICE,
    payload: async () => {
      const res = await API.get("/office/admins");
      const data = res.data;
      return data;
    },
  };
};
