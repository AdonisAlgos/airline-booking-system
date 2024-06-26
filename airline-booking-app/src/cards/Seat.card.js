import React from "react";
import "./Seat.css";

const SeatCard = ({ seat, isAisle, onSeatSelect, selected }) => {
  return (
    <div
      className={`col-1 seat ${isAisle ? "aisle" : ""} ${
        seat.status === "blocked" || seat.status === "booked"
          ? "blocked"
          : `${selected && "selected"}`
      }`}
      onClick={seat.status !== "blocked" ? () => onSeatSelect(seat) : null}
    >
      <div className="seat-content d-flex align-items-center justify-content-center">
        {seat.label}
      </div>
    </div>
  );
};

export default SeatCard;