// import axios from 'axios';
import { LIST_STATION } from "../config/constants";
import { API } from "../config/api";

export const getListStation = () => {
  return {
    type: LIST_STATION,
    payload: async () => {
      const res = await API.get("/list_station");
      const data = res.data.data;
      return data;
    },
  };
};
