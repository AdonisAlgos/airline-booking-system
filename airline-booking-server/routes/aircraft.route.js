const express = require("express");
const router = express.Router();
const Aircraft = require("../models/aircraft.model");
const Seat = require("../models/seat.model");

// Route to get seating plan of an aircraft based by ID
router.get("/getAircraft/:id", async (req, res) => {
  try {
    const aircraft = await Aircraft.findById(req.params.id).exec();
    console.log("hi");
    if (!aircraft) {
      return res.status(404).json({ message: "Aircraft not found" });
    }

    const seatIds = aircraft.seatingPlan.flat();
    const seats = await Seat.find({ _id: { $in: seatIds } }).exec();
    console.log(seats);

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

    console.log("Seating Plan with Details:", seatingPlanWithDetails);

    res.json({
      ...aircraft._doc,
      seatingPlan: seatingPlanWithDetails,
    });
    console.log(aircraft);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
