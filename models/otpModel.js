const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  otp: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [true],
  },
  username: {
    type: String,
    required: [true],
  },
  userId: {
    type: String,
    required: [true],
  },
});

const Reset = mongoose.model("Reset", otpSchema);

module.exports = Reset;
