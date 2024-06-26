import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { getAircraft } from "../apis/getAircraft.api";
import SeatCard from "../cards/Seat.card";

const Aircraft = forwardRef(
  ({ passengers, aircraftId, setSelectedSeatsInBooking }, ref) => {
    const [aircraft, setAircraft] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [groupSeats, setGroupSeats] = useState([]);

    useEffect(() => {
      getAircraft(aircraftId)
        .then((response) => {
          const aircraftData = response.data;

          const threshold = Math.ceil(
            aircraftData.seatingPlan.length / passengers.length
          );

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
              } else if (
                (seat.status === "blocked" || seat.status === "booked") &&
                count !== passengers.length
              ) {
                count = 0;
                currentGroup = [];
              }
            });
            if (count === passengers.length) {
              groups++;
              seatGroups = seatGroups.concat(currentGroup);
            }
          });

          setGroupSeats(seatGroups);
          console.log(seatGroups);

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
        })
        .catch((error) => {
          console.error("Error fetching aircraft data:", error);
        });
    }, [aircraftId, passengers]);

    useEffect(() => {
      setSelectedSeatsInBooking(selectedSeats);
    }, [selectedSeats, setSelectedSeatsInBooking]);

    const handleSeatSelect = (seat) => {
      setSelectedSeats((prevSelectedSeats) => {
        if (prevSelectedSeats.includes(seat)) {
          return prevSelectedSeats.filter((s) => s !== seat);
        } else {
          return [...prevSelectedSeats, seat];
        }
      });
    };

    useImperativeHandle(ref, () => ({
      checkSelection: () => {
        if (groupSeats.length === 0) {
          console.log(groupSeats);
          return true;
        }

        const selectedSeatLabels = selectedSeats.map((seat) => seat.label);
        let leftEmptySeatCount = 0;
        let rightEmptySeatCount = 0;

        for (let i = 0; i < selectedSeats.length; i++) {
          const seat = selectedSeats[i];
          leftEmptySeatCount = 0;
          rightEmptySeatCount = 0;

          for (let col = Number(seat.column - 1); col >= 0; col--) {
            let leftSeat = aircraft.seatingPlan[seat.row][col];
            console.log(leftSeat.label);
            if (
              selectedSeatLabels.includes(leftSeat.label) ||
              leftSeat.status === "blocked" ||
              leftSeat.status === "booked"
            ) {
              break;
            } else if (leftSeat.status === "available") {
              leftEmptySeatCount += 1;
            }
          }

          for (
            let col = Number(seat.column) + 1;
            col < aircraft.seatingPlan[seat.row].length;
            col++
          ) {
            let rightSeat = aircraft.seatingPlan[seat.row][col];
            console.log(rightSeat.label);
            if (
              selectedSeatLabels.includes(rightSeat.label) ||
              rightSeat.status === "blocked" ||
              rightSeat.status === "booked"
            ) {
              break;
            } else if (rightSeat.status === "available") {
              rightEmptySeatCount += 1;
            }
          }

          if (leftEmptySeatCount === 1 || rightEmptySeatCount === 1) {
            console.log("Scattered seats found.");
            return false;
          }
        }
        return true;
      },
    }));


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
  }
);

export default Aircraft;
