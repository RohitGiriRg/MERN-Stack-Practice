const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
// https://daily-code-web.vercel.app/tracks/oAjvkeRNZThPMxZf4aX5/JLaLbhDuYn3h5Cn7WJu1

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);
