const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  flightPrice: { type: Number, required: true },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
