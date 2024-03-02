const mongoose = require("mongoose");
const { boolean } = require("zod");

// connecting to database
mongoose.connect(
  "mongodb+srv://RohitGiri:fgoDbLvULg8ufvN9@cluster0.lelp9gg.mongodb.net/todo"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);
module.exports = {
  todo,
};
