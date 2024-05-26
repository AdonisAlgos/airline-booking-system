const express = require("express");
const router = express.Router();
const Aircraft = require("../models/aircraft.model");
const Seat = require("../models/seat.model");

// Route to get seating plan of an aircraft based by ID
router.get("/getAircraft/:id", async (req, res) => {
  try {
    const aircraft = await Aircraft.findById(req.params.id).exec();
    if (!aircraft) {
      return res.status(404).json({ message: "Aircraft not found" });
    }

    const seatIds = aircraft.seatingPlan.flat();
    const seats = await Seat.find({ _id: { $in: seatIds } }).exec();

    // Organize seats in the same structure as seatingPlan

    const seatingPlanWithDetails = aircraft.seatingPlan.map((row) =>
      row.map((seatId) => {
        const seat = seats.find(
          (seat) => seat._id.toString() === seatId.toString()
        );
        if (!seat) {
          console.log(`Seat not found for ID: ${seatId}`);
        }
        return seat;
      })
    );

    res.json({
      ...aircraft._doc,
      seatingPlan: seatingPlanWithDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Endpoint to update the seating plan of an aircraft
router.put("/updateSeatingPlan/:seatId", async (req, res) => {
  const { status } = req.body;

  try {
    const seat = await Seat.findById(req.params.seatId).exec();
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }
    seat.status = status;

    await seat.save();
    res.status(200).json({ message: "Seat status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



module.exports = router;
