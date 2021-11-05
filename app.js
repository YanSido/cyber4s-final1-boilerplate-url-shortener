require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shortRouter = require("./routers/shortRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/public", express.static(`./public`));
app.use("/", shortRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
