const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    fullDescription: { type: String },
    category: { type: String },
    image: { type: String },
    minAge: { type: Number, default: 0 },
    maxAge: { type: Number, default: 120 },
    minIncome: { type: Number, default: 0 },
    maxIncome: { type: Number, default: 99999999 },
    occupation: { type: String },
    gender: { type: String, enum: ["Male", "Female", "All"], default: "All" },
    sector: { type: String }, // Can be used if distinct from category
    state: { type: String, default: "All" },
    applyLink: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scheme", schemeSchema);
