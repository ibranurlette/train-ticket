import { GET_TICKET } from "../config/constants";
import { API } from "../config/api";

export const get_ticket = ({ startStation, destination, dateStart }) => {
  return {
    type: GET_TICKET,
    payload: async () => {
      const res = await API.get(
        `/tickets?startStation=${startStation}&destination=${destination}&dateStart=${dateStart}`
      );
      const data = res.data;
      return data;
    },
  };
};
