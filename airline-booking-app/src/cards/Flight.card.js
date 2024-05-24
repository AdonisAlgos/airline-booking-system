import React from "react";

const FlightCard = ({ flight }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{flight.flightNumber}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {flight.departure} to {flight.destination}
        </h6>
        <p className="card-text">
          <strong>Departure Date:</strong>{" "}
          {new Date(flight.departureDate).toLocaleDateString()}
          <br />
          <strong>Departure Time:</strong>{" "}
          {new Date(flight.departureTime).toLocaleTimeString()}
          <br />
          <strong>Arrival Date:</strong>{" "}
          {new Date(flight.arrivalDate).toLocaleDateString()}
          <br />
          <strong>Arrival Time:</strong>{" "}
          {new Date(flight.arrivalTime).toLocaleTimeString()}
          <br />
          <strong>Price:</strong> ${flight.flightPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default FlightCard;
