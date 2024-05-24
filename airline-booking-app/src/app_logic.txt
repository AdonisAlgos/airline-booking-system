import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [aircraft, setAircraft] = useState(null);
  const aircraftId = "664f716c57c7e882904afabd";

  useEffect(() => {
    const fetchAircraft = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5100/api/aircraft/${aircraftId}`
        );
        setAircraft(response.data);
      } catch (error) {
        console.error("Error fetching aircraft data:", error);
      }
    };

    fetchAircraft();
  }, []);

  if (!aircraft) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">{aircraft.name}</h1>
      <div className="seating-plan container-lg">
        {aircraft.seatingPlan.map((row, rowIndex) => (
          <div key={rowIndex} className="row justify-content-center mb-2">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`col-1 seat ${seat.occupied ? "occupied" : ""}`}
              >
                <div className="seat-content d-flex align-items-center justify-content-center">
                  {seat.label}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
