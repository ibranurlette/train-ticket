import {
  DELETE_PAYMENT,
} from "../config/constants";
import { API } from "../config/api";
export const deletePayment = (id) => {
  return {
    type: DELETE_PAYMENT,
    payload: async () => {
      const res = await API.delete(`/payment/${id}`);
      const data = res.data;
      return data;
    }
  };
};
