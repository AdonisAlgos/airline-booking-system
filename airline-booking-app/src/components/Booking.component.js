import React, { useRef, useState } from "react";
import Aircraft from "./Aircraft.component";
import { useUser } from "../contexts/User.context";
import { updateSeatingPlan } from "../apis/updateSeatingPlan.api";

const Booking = ({ show, handleClose, aircraftId }) => {
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState([{ name: "", ageGroup: "" }]);
  const seatingPlanRef = useRef();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { user } = useUser();

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

  const handleSeatSelectionChange = (seats) => {
    setSelectedSeats(seats);
  };

  const handleCheckout = () => {
    setTimeout(() => {
      for (const seat of selectedSeats) {
        updateSeatingPlan(seat._id, "booked");
      }
      setStep(1);
      setSelectedSeats([]);
      setPassengers([{ name: "", ageGroup: "" }]);
      alert("Booking confirmed!");
      handleClose();
    }, 3000);
  };

  const handleConfirmSeats = () => {
    if (!user) {
      alert("Please sign-in or register an account to book a flight.");
      return;
    }
    if (selectedSeats.length !== passengers.length) {
      alert("Please select a seat for each passenger.");
      return;
    }
    const validSelection = seatingPlanRef.current.checkSelection();
    if (validSelection) {
      setStep(step + 1);
    } else {
      alert("Please select seats that do not cause scattered seats.");
    }
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
            {step === 1 && <h5 className="modal-title">Booking Passengers</h5>}
            {step === 2 && <h5 className="modal-title">Select Seats</h5>}
            {step === 3 && <h5 className="modal-title">Booking Summary</h5>}
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
                  aircraftId={aircraftId}
                  passengers={passengers}
                  setSelectedSeatsInBooking={handleSeatSelectionChange}
                  ref={seatingPlanRef}
                />
              </div>
            )}
            {step === 3 && (
              <div>
                <ul>
                  {passengers.map((passenger, index) => (
                    <li key={index}>
                      {passenger.name} - {passenger.ageGroup}
                    </li>
                  ))}
                  <li>
                    Seats: {selectedSeats.map((seat) => seat.label).join(", ")}
                  </li>
                </ul>
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
            {step === 3 && (
              <button
                type="button"
                className="btn custom-button"
                onClick={handleCheckout}
              >
                Checkout
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
