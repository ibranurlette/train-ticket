import {
  UPDATE_PAYMENT,
} from "../config/constants";
import { API } from "../config/api";
export const updatePayment = (id, data2)=> {
  return {
    type: UPDATE_PAYMENT,
    payload: async () => {
      const res = await API.put(`/payment/${id}`, data2);
      const {data} = res.data;
      return data;
    }
  };
};
