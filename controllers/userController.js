const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, gender, dob, state } = req.body;
    if (!name || !email || !gender || !dob || !state) {
      return res.status(400).json({ error: "All fields are required" });
    }
    await new Promise((resolve, reject) => {
      User.createUser({ name, email, gender, dob, state }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await new Promise((resolve, reject) => {
      User.getAllUsers((err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers:", error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, dob, state } = req.body;
    if (!name || !email || !gender || !dob || !state) {
      return res.status(400).json({ error: "All fields are required" });
    }
    await new Promise((resolve, reject) => {
      User.updateUser(
        id,
        { name, email, gender, dob, state },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Error in updateUser:", error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await new Promise((resolve, reject) => {
      User.deleteUser(id, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
