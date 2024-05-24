const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const aircraftRoutes = require("./routes/aircraft.route");
const userRoutes = require("./routes/user.route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use("/api/aircraft", aircraftRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
