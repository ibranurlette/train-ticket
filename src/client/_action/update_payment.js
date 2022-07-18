import { UPDATE_PAYMENT } from "../config/constants";
import { API } from "../config/api";

export const updatePayment = (data) => {
  const { id, train } = data;
  return {
    type: UPDATE_PAYMENT,
    payload: async () => {
      const res = await API.put(`/payment/${id}`, train);
      const { data } = res.data;
      return data;
    },
  };
};
