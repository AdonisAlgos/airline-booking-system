import axios from "axios";

export const authentication = (data) => {
  return axios.post(`http://localhost:5100/api/user/login`, data);
};
