const mongoose = require("mongoose");
const { boolean } = require("zod");

// connecting to database
mongoose.connect(
  "mongodb+srv://RkvhtGk:fgaoegkDbLvfefdeasdfULg8ufvgN9@cggleuster0.lelkp9qgxg.mongodb.net/todo"
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
