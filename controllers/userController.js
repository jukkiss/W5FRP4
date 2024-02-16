const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');


const saltRounds = 10;

// User registration
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User login
// Assuming JWT_SECRET is an environment variable holding your secret key
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' }); // Customize expiresIn as needed

    res.status(200).json({ message: "Authentication successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the controller functions
module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser,
};
