import React, { useEffect, useState } from "react";
import { getFlights } from "../apis/flights.api";
import FlightCard from "../cards/Flight.card";

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getFlights()
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  });

  return (
    <div>
      <div className="row g-3">
        {flights.map((flight) => (
          <div className="col-lg-4 col-sm-6" key={flight._id}>
            <FlightCard flight={flight} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
