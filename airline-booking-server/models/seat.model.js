const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  column: { type: String, required: true },
  status: {
    type: String,
    default: "available",
    enum: ["available", "booked", "blocked"],
  },
  label: { type: String, required: true },
});

const SeatModel = mongoose.model("seats", seatSchema);

module.exports = SeatModel;
