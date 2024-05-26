import React, { useRef, useState } from "react";
import Aircraft from "./Aircraft.component";

const Booking = ({ show, handleClose }) => {
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState([{ name: "", ageGroup: "" }]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatingPlanRef = useRef();

  const handlePassengerChange = (index, event) => {
    const { name, value } = event.target;
    const newPassengers = [...passengers];
    newPassengers[index][name] = value;
    setPassengers(newPassengers);
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: "", ageGroup: "" }]);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleConfirmSeats = () => {
    const validSelection = seatingPlanRef.current.checkSelection();
    if (validSelection) {
      setStep(step + 1);
    } else {
      alert("Please select seats that do not cause scattered seats.");
    }

    // handleClose();
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {step === 1 ? "Booking Passengers" : "Select Seats"}
            </h5>
          </div>
          <div className="modal-body">
            {step === 1 && (
              <form>
                {passengers.map((passenger, index) => (
                  <div key={index} className="mb-3">
                    <div className="form-group mb-2">
                      <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="Enter name"
                        name="name"
                        value={passenger.name}
                        onChange={(event) =>
                          handlePassengerChange(index, event)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className="form-control custom-input"
                        name="ageGroup"
                        value={passenger.ageGroup}
                        onChange={(event) =>
                          handlePassengerChange(index, event)
                        }
                      >
                        <option value="">Select age group</option>
                        <option value="child">Child</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn custom-button mb-4"
                  onClick={handleAddPassenger}
                >
                  Add Passenger
                </button>
              </form>
            )}
            {step === 2 && (
              <div>
                <Aircraft
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  passengers={passengers}
                  ref={seatingPlanRef}
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            {step > 1 && (
              <button
                type="button"
                className="btn custom-button"
                onClick={handlePreviousStep}
              >
                Back
              </button>
            )}
            {step === 1 && (
              <button
                type="button"
                className="btn custom-button"
                onClick={handleNextStep}
              >
                Continue
              </button>
            )}
            {step === 2 && (
              <button
                type="button"
                className="btn custom-button"
                onClick={handleConfirmSeats}
              >
                Confirm
              </button>
            )}
            <button
              type="button"
              className="btn custom-button"
              style={{ backgroundColor: "#262626" }}
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
