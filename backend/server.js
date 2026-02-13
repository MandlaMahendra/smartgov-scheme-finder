const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 IMPORTANT
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/schemes", require("./routes/schemeRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
