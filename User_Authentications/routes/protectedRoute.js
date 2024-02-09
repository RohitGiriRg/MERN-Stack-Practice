// routes/protectedRoute.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Protected route
router.get("/", verifyToken, (req, res) => {
  // Access the user information from req.user
  const { _id, email } = req.user;

  // You can now use the user information to customize the response or perform other actions
  res.json({
    message: "Protected route accessed successfully",
    userId: _id,
    userEmail: email,
  });
});

module.exports = router;
