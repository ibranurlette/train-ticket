// import axios from 'axios';
import {
  LIST_STATION,
  LIST_TRAIN,
  TAMBAH_TRAIN,
  GET_TYPE_TRAIN,
} from "../config/constants";
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

export const getListTrain = () => {
  return {
    type: LIST_TRAIN,
    payload: async () => {
      const res = await API.get("/list_train");
      const data = res.data.data;
      return data;
    },
  };
};

export const Tambah_train = (data) => {
  return {
    type: TAMBAH_TRAIN,
    payload: async () => {
      const res = await API.post("/ticket", data);
      const { data2 } = res.data;
      return data2;
    },
  };
};

export const getType_train = () => {
  return {
    type: GET_TYPE_TRAIN,
    payload: async () => {
      const res = await API.get("/type_train");
      const { data } = res.data;
      return data;
    },
  };
};
