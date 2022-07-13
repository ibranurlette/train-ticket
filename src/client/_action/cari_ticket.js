import {GET_TICKET} from '../config/constants';
import {API} from '../config/api';

export const get_ticket = (dateStart  ) => {
  return {
    type: GET_TICKET,
    payload: async () => {
      	const res = await API.get(`/tickets?dateStart=${dateStart}`);
	       // console.log(dateStart, "ini data start")
      	const data = res.data;
      	 return data;
    }

  };
};