import React, { useState, useEffect } from "react";
import { getAircraft } from "../apis/getAircraft.api";
import SeatCard from "../cards/Seat.card";

const Aircraft = ({ passengers }) => {
  const [aircraft, setAircraft] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const aircraftId = "664f716c57c7e882904afabd";
  const [groupSeats, setGroupSeats] = useState([]);

  useEffect(() => {
    getAircraft(aircraftId)
      .then((response) => {
        const aircraftData = response.data;
        let groups = 0;
        let seatGroups = [];

        aircraftData.seatingPlan.forEach((row) => {
          let count = 0;
          let currentGroup = [];
          row.forEach((seat) => {
            if (seat.status === "available") {
              count++;
              currentGroup.push(seat.label);
            } else if (
              (seat.status === "blocked" || seat.status === "booked") &&
              count === passengers.length
            ) {
              groups++;
              seatGroups = seatGroups.concat(currentGroup);
              count = 0;
              currentGroup = [];
            }
          });
          if (count === passengers.length) {
            groups++;
            seatGroups = seatGroups.concat(currentGroup);
          }
        });

        const threshold = Math.ceil(
          aircraftData.seatingPlan.length / passengers.length
        );
        setGroupSeats(seatGroups);

        if (groups >= threshold) {
          aircraftData.seatingPlan.forEach((row) => {
            row.forEach((seat) => {
              if (!seatGroups.includes(seat.label)) {
                seat.status = "blocked";
              }
            });
          });
        }

        setAircraft(aircraftData);
        console.log("Total groups: ", groups);
        console.log("Threshold: ", threshold);
        console.log("Seat groups: ", groupSeats);
      })
      .catch((error) => {
        console.error("Error fetching aircraft data:", error);
      });
  }, []);

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  if (!aircraft) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="seating-plan">
        {aircraft.seatingPlan.map((row, rowIndex) => (
          <div key={rowIndex} className="row justify-content-center mb-1">
            {row.map((seat, seatIndex) => (
              <SeatCard
                key={seatIndex}
                seat={seat}
                isAisle={seatIndex === Math.floor(row.length / 2)}
                onSeatSelect={handleSeatSelect}
                selected={selectedSeats.includes(seat)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aircraft;
