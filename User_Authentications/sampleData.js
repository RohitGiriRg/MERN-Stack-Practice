const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // For password hashing
const User = require("../models/user"); //    Ass-uming you have a User model

router.post("/register", async (req, res) => {
  try {
    // Extract user input from the request body
    const { username, email, password } = req.body;

    // Validate input data
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle errors, e.g., database error, etc.
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
