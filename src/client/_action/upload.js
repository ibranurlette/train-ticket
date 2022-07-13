import { API } from "../config/api";
import {UPLOAD_PROOF} from "../config/constants";
export const uploadProof = (formData, id) => {
  return {
    type: UPLOAD_PROOF,
    payload: async () => {
      const res = await API.post(`/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { data } = res.data;
      return data;
    }
  };
};