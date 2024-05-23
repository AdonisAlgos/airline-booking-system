const mongoose = require("mongoose");

const aircraftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seatingPlan: [[seatSchema]],
});

const AircraftModel = mongoose.model("aircrafts", aircraftSchema);

module.exports = AircraftModel;
