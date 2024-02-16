const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/particulardatas");

const TodoCollection = new mongoose.Schema({
  title: String,
  description: String,
});

const Todo = mongoose.model("particulardatas", TodoCollection);

// Creating Todos
app.post("/api/todos", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`You are listening to the port ${port}`);
});

// Getting the todo present in the database
app.get("/api/todos", async (req, res) => {
  try {
    const previousData = await Todo.find();
    if (!previousData) {
      res.json("No Data found");
    } else {
      res.json(previousData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
