import { UPDATE_PAYMENT } from "../config/constants";
import { API } from "../config/api";

export const updatePayment = (data) => {
  const { idTransaction, train } = data;
  return {
    type: UPDATE_PAYMENT,
    payload: async () => {
      const res = await API.put(`/payment/${idTransaction}`, train);
      const { data } = res.data;
      return data;
    },
  };
};
