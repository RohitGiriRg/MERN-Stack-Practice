const express = require("express");
const mongoose = require("mongoose");
const aws = require("aws-sdk");
const multer = require("multer");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/file-upload");

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`your server is running on local host ${PORT}`);
});
