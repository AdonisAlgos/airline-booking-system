import React, { useState, useEffect } from "react";
import { getAircraft } from "../apis/getAircraft.api";
import SeatCard from "../cards/Seat.card";

const Aircraft = () => {
  const [aircraft, setAircraft] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const aircraftId = "664f716c57c7e882904afabd";

  useEffect(() => {
    getAircraft(aircraftId)
      .then((response) => {
        setAircraft(response.data);
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
