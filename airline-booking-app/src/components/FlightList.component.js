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
  }, []);

  return (
    <div className="container">
      <h1>Flights</h1>
      <div className="row">
        {flights.map((flight) => (
          <div className="col-md-4" key={flight._id}>
            <FlightCard flight={flight} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
