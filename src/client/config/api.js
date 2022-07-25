import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.1.20:5000/api/v1",
});

export const setAuthToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
