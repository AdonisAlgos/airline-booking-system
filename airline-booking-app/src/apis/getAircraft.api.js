import axios from "axios";

export const getAircraft = (aircraftId, data) => {
  return axios.get(
    `http://localhost:5100/api/aircraft/getAircraft/${aircraftId}`,
    data
  );
};
