const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Creating Database
mongoose.connect("mongodb://localhost:27017/collectionTodo");

// creating mongodb schema
const todoData = new mongoose.Schema({
  title: String,
  description: String,
});

const createTodo = mongoose.model("collectionTodo", todoData);
