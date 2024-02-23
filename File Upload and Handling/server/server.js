const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
const PORT = 5000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/file-upload");

// Creating mongodb relational model and also passing the file to the server

const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  uploadAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("file", fileSchema);

// uploading files to the database

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  const { filename } = req.file;
  const url = `/uploads/${filename}`;

  try {
    const newFile = new File({ filename, url });
    await newFile.save();
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`your server is running on local host ${PORT}`);
});
