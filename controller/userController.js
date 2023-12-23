const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const createToken = (_id) => {
  return jwt.sign({ _id }, "bitterbottel", { expiresIn: "1h" });
};

const UserController = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  userProfile,
  inputEmail,
  uploadAvatar,
  userAvatar,
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

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Username already exists",
        },
      });
    }

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

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: {
          code: 404,
          message: "User not found",
        },
      });
    }
    const passValidation = await bcrypt.compare(password, user.password);

    if (!passValidation) {
      return res.status(404).json({
        status: {
          code: 404,
          message: "Password tidak valid",
        },
      });
    }
    const token = createToken(user._id);
    res.status(200).json({
      status: {
        code: 200,
        message: "Login Success",
      },
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function logoutUser(req, res) {
  const token = req.user.token;
  const newToken = token.filter((t) => t.token !== token);
  await User.findByIdAndUpdate(req.user._id, { token: newToken });
  res.status(200).json({
    status: {
      code: 200,
      message: "Logout Success",
    },
  });
}

async function userProfile(req, res) {
  try {
    if (!req.user || !req.user._id) {
      res.status(400).json({ message: "Invalid user information" });
      return;
    }

    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
}

async function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const avatar = req.file.filename;
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!req.user || !req.user._id) {
      res.status(400).json({ message: "Invalid user information" });
      return;
    }

    user.avatar = avatar;
    await user.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Image uploaded successfully",
      },
      data: {
        avatar: avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function userAvatar(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (user && user.avatar) {
      const imagePath = path.join(
        __dirname,
        "../images",
        "avatars",
        user.avatar
      );

      res.sendFile(imagePath);
    } else {
      res.status(404).json({
        status: {
          code: 404,
          message: "User or avatar not found",
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function inputEmail(req, res) {
  try {
    const { email } = req.body;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = UserController;
