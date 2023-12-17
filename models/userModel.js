const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username"],
    },
    password: {
      type: String,
      require: [true],
    },
    email: {
      type: String,
      required: [true],
    },
    firstName: {
      type: String,
      required: [false],
    },
    lastName: {
      type: String,
      required: [false],
    },
    birthDate: {
      type: Date,
      required: [false],
    },
    avatar: {
      type: String,
      required: [false],
      default: "/path/defaultpic.png",
    },
    role: {
      type: String,
      required: [false],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
