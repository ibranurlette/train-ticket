// import axios from 'axios';
import { AUTH, AUTH_RELOAD } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const login = (data) => {
  return {
    type: AUTH,
    payload: async () => {
      const res = await API.post("/login", data);
      const { token } = res.data;
      localStorage.setItem("token", token);
      return res.data;
    },
  };
};

export const register = (data) => {
  return {
    type: AUTH,
    payload: async () => {
      const res = await API.post("/register", data);
      const { token } = res.data;
      localStorage.setItem("token", token);
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
