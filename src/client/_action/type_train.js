import { GET_TYPE_TRAIN } from "../config/constants";
import { API } from "../config/api";

export const getType_train = () => {
  return {
    type: GET_TYPE_TRAIN,
    payload: async () => {
      const res = await API.get("/type_train");
      const { data } = res.data;
      return data;
    }
  };
};
