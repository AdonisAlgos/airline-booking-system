const mongoose = require("mongoose");
const SeatModel = require("./seat.model");

const aircraftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seatingPlan: [[SeatModel.schema]],
});

const AircraftModel = mongoose.model("aircrafts", aircraftSchema);

module.exports = AircraftModel;
