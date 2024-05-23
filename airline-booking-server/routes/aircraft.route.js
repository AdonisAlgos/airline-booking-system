const express = require("express");
const router = express.Router();
const Aircraft = require("../models/Aircraft");

// Route to get seating plan of an aircraft based by ID
router.get("/:id", async (req, res) => {
  try {
    const aircraft = await Aircraft.findById(req.params.id);

    // If aircraft not found, return error
    if (!aircraft) {
      return res.status(404).json({ message: "Aircraft not found" });
    }

    // Return the seating plan
    res.status(200).json(aircraft.seatingPlan);
  } catch (error) {
    console.error("Error retrieving seating plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
