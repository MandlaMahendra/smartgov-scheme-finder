const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Root route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "SmartGov Scheme Finder API is running 🚀"
  });
});

// Routes
app.use("/api/schemes", require("./routes/schemeRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔥 PRODUCTION PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
