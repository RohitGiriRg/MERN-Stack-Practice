const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/registration", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Checking if the user is filling all the fields in the database
    if (!username || !email || !password) {
      return req.status(400).json({ error: "All the fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: "User email id exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User Resgistered Sucessfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Login cha pn logic karacha ahe

module.exports = router;
