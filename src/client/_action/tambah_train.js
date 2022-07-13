import {TAMBAH_TRAIN} from '../config/constants';
import {API} from '../config/api';
export const Tambah_train = data => {
  return {
    type: TAMBAH_TRAIN,
    payload: async () => {
      const res = await API.post("/ticket", data);
      const  {data2}  = res.data;
      return data2;
    }
  };
};