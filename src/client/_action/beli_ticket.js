import {BELI_TICKET} from '../config/constants';
import {API, setAuthToken} from '../config/api';
export const Beli_ticket = dataTicket => {
console.log(dataTicket, "dataTicket")
  return {
    type: BELI_TICKET,
    payload: async () => {
      const token = localStorage.getItem("token")
      setAuthToken(token);
      const res = await API.post("/payment", dataTicket);
      const  {data}  = res.data;
      return data;
    }
  };
};