const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 5000;

app.use(cors());
app.use(express());

mongoose.connect("mongodb://localhost:27017/CRUD");
const Message = mongoose.model("Message", { user: String, text: String });

app.get("/", (req, res) => {
  res.send("Bingo on the port");
});

io.on("connection", (socket) => {
  console.log("new user connected");
  // Listen for incoming messages
  socket.on("message", (data) => {
    // Save the message to the database
    const message = new Message(data);
    message.save();

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.listen(PORT, () => {
  console.log(`Your server is running on the port ${PORT}`);
});
