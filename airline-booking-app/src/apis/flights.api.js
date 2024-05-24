import axios from "axios";

export const getFlights = () => {
  return axios.get(`http://localhost:5100/api/flight/getFlights`);
};
