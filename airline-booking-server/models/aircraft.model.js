const mongoose = require("mongoose");

const aircraftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seatingPlan: [[{ type: mongoose.Schema.Types.ObjectId, ref: "seat" }]],
});

const Aircraft = mongoose.model("Aircraft", aircraftSchema);

module.exports = Aircraft;
