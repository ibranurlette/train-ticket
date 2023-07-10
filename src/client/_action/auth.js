// import axios from 'axios';
import { AUTH, AUTH_RELOAD } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const login = (data) => {
  console.log("DATAAASS LOGIMN", data);
  return {
    type: AUTH,
    payload: async () => {
      const res = await API.post("/office/login", data);
      console.log("RESPONSEKUUU", res);

      const { token } = res.data;
      localStorage.setItem("token", token);
      console.log("RESPONSE DATA", res.data);
      return res.data;
    },
  };
};

export const authReload = () => {
  return {
    type: AUTH_RELOAD,
    payload: async () => {
      setAuthToken();
      const res = await API.get("/auth");
      const { data } = res.data;
      return data;
    },
  };
};
