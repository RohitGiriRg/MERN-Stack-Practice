const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/particulardatas");

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

// Updating the specific todos by id.

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    console.log("asdf");
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deleting the todos
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedId = await Todo.findByIdAndDelete(id);
    res.json({ message: `Deleted todo with id : ${deletedId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`You are listening to the port ${port}`);
});
