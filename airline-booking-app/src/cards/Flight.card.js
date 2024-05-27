import React, { useState } from "react";
import Booking from "../components/Booking.component";

const FlightCard = ({ flight }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="card mb-4 shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{flight.flightNumber}</h5>
          <h6 className="card-subtitle mb-3 text-muted">
            {flight.departure} to {flight.destination}
          </h6>
          <p className="card-text">
            <strong>Departure Date:</strong>{" "}
            {new Date(flight.arrivalDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
            <br />
            <strong>Arrival Date:</strong>{" "}
            {new Date(flight.arrivalDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
            <br />
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn custom-button" onClick={handleShow}>
              Book Now
            </button>
            <small className="text-muted">
              Price: £{flight.flightPrice.toFixed(2)}
            </small>
          </div>
        </div>
      </div>
      <Booking
        aircraftId={flight.aircraftid}
        flight={flight}
        show={showModal}
        handleClose={handleClose}
      />
    </>
  );
};

export default FlightCard;
