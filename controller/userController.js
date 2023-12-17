const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const UserController = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};

async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function createUser(req, res) {
  try {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      birthDate,
      avatar,
      role,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      birthDate,
      avatar,
      role,
    });

    const user = await newUser.save();
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = UserController;
