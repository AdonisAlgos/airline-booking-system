import axios from "axios";

export const updateSeatingPlan = (seatId, status) => {
  return axios.put(
    `http://localhost:5100/api/aircraft/updateSeatingPlan/${seatId}`,
    { status }
  );
};
