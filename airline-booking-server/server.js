const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const aircraftRoutes = require("./routes/aircraft.route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use("/api/aircraft", aircraftRoutes);

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
