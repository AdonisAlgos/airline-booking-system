const express = require("express");
const router = express.Router();
const Flight = require("../models/flight.model");

router.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.status(200).json(flights);
  } catch (error) {
    console.error("Error retrieving flights:", error);
    res.status(500).json({ message: "Error retrieving flights" });
  }
});

module.exports = router;
