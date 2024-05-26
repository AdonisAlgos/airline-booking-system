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
      console.log(aircraftId);
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
    }, [aircraftId]);

    useEffect(() => {
      setSelectedSeatsInBooking(selectedSeats);
    }, [selectedSeats, setSelectedSeatsInBooking]);

    const handleSeatSelect = (seat) => {
      setSelectedSeats((prevSelectedSeats) => {
        console.log("Selected seats: ", selectedSeats);

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
          return true;
        }

        const selectedSeatLabels = selectedSeats.map((seat) => seat.label);
        let leftEmptySeatCount = 0;
        let rightEmptySeatCount = 0;

        console.log(aircraft.seatingPlan);

        selectedSeats.forEach((seat) => {
          for (let col = seat.column - 1; col >= 0; col--) {
            let leftSeat = aircraft.seatingPlan[seat.row][col];
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
            let col = seat.column + 1;
            col < aircraft.seatingPlan[seat.row].length;
            col++
          ) {
            let rightSeat = aircraft.seatingPlan[seat.row][col];
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
            return false;
          }
        });
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
