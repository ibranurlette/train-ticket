// import axios from 'axios';
import { LIST_TRAIN } from "../config/constants";
import { API } from "../config/api";

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
