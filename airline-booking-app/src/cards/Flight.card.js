import React from "react";

const FlightCard = () => {
  
  return (
    <div style={{ backgroundColor: "white" }}>
      <li key={flight._id}>
        <div>{flight.flightNumber}</div>
        <div>{flight.departure}</div>
        <div>{flight.destination}</div>
        <div>{flight.departureDate}</div>
        <div>{flight.departureTime}</div>
        <div>{flight.arrivalDate}</div>
        <div>{flight.arrivalTime}</div>
        <div>{flight.price}</div>
      </li>
    </div>
  );
};

export default FlightCard;
