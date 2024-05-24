import axios from "axios";

export const registration = (data) => {
  return axios.post(`http://localhost:5100/api/user/register`, data);
};
