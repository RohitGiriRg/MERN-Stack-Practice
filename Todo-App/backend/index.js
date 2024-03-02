const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    res.status(411).json({
      msg: "You have send wrong input",
    });
    return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "Todo Created",
  });
});

app.get("/todos", async (req, res) => {
  const gettingTodo = await todo.find({});
  res.json({ gettingTodo });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parseUpdate = updateTodo.safeParse(updatePayload);

  if (!parseUpdate.success) {
    res.status(411).json({ msg: "You have send wrong input" });
    return;
  }

  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Todo Marked as completed",
  });
});

app.listen(3000, () => {
  console.log("Your server is running on port 3000");
});
