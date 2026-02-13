const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // Profile Fields
  profilePhoto: { type: String }, // URL or Base64
  age: { type: Number },
  gender: { type: String },
  state: { type: String },
  occupation: { type: String },
  phoneNumber: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
