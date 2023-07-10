// import axios from 'axios';
import { GET_USER_APP } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getUsers = () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return {
    type: GET_USER_APP,
    payload: async () => {
      const res = await API.get("/users");
      const data = res.data;
      return data;
    },
  };
};
