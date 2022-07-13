import {
  DELETE_ORDER,
} from "../config/constans";
import { API } from "../config/api";
export const deleteOrder = id => {
  return {
    type: DELETE_ORDER,
    payload: async () => {
      const res = await API.delete(`/order/${id}`);
      const { x } = res.data;
      return x;
    }
  };
};