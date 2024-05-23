const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  aircraftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aircraft",
    required: true,
  },
});

const FlightModel = mongoose.model("flights", flightSchema);

module.exports = FlightModel;
