// controllers/userController.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "Success", users });
  } catch (err) {
    res.status(500).json({ status: "Error", error: err.message });
  }
};

exports.addUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({
      status: "Success",
      message: "User added successfully",
      user: newUser,
    });
  } catch (err) {
    // Handle duplicate key error
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      res.status(400).json({
        status: "Error",
        error: `The ${duplicateField} '${err.keyValue[duplicateField]}' is already in use.`,
      });
    } else {
      res.status(500).json({ status: "error", error: err.message });
    }
  }
};

// controllers/userController.js
exports.loginUser = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ status: "error", error: "Name is required for login." });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({
        status: "error",
        error: "User not found. Please check the username.",
      });
    }

    res
      .status(200)
      .json({ status: "Success", message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};
