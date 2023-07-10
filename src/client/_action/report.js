// import axios from 'axios';
import { GET_REPORT } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getReport = () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  return {
    type: GET_REPORT,
    payload: async () => {
      const res = await API.get("/reports");
      const data = res.data;
      return data;
    },
  };
};
