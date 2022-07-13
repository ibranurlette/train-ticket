// import axios from 'axios';
import {GET_MYTICKET} from '../config/constants';
import {API} from '../config/api';


export const getMyticket = () => {
  return {
    type: GET_MYTICKET,
    payload: async () => {
      const res = await API.get("/Mytickets");
      const data  = res.data.data;
      return data;
    }
  };
};

