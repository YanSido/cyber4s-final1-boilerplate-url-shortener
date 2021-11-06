require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shortRouter = require("./routers/shortRouter");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const userHandler = require("./middleware/userHandler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static(`./public`));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/", userHandler, shortRouter);
app.use(errorHandler);

module.exports = app;
