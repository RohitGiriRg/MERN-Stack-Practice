const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/registration", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Checking if the user is filling all the fields in the database
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All the fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User email id exists" });
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

/*     Note :-
 *     there should be separe authentication JS file for login and
 *     registration, other wise the server will be crash due to many
 *     many respond of error like here i am sending respons in both
 *     login funtionality and also registrations funtionality with
 *     the same status code for example give below : these will crash
 *     res.status(500).json({ error: "Internal Server Error" });
 */

// User Login cha pn logic karacha ahe
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("hello");

    if (!email || !password) {
      return res.status(400).json({ error: "Please enter both the field" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email Id does not exists" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(401).json({ error: "Invalid Email Id or Password" });
    }

    const payload = {
      user: {
        user: user._id,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, "asdf", { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
