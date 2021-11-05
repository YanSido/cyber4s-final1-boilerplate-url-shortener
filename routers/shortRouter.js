const express = require("express");
const shortRouter = express.Router();
const fs = require("fs");
const path = require("path");
const homeUrl = "http://localhost:3000";

function getRandomNumber() {
  // Returns random numbers and letters in length of 8
  let random_string =
    Math.random().toString(32).substring(2, 6) +
    Math.random().toString(32).substring(2, 6);
  return random_string;
}

shortRouter.post("/api/shorturl/new", (req, res) => {
  // Handle short url post request
  let newPath = getRandomNumber();
  console.log(req.body.url, `=`, `${homeUrl}/api/shorturl/new/${newPath}`);
  res.send(req.body.url);
});

module.exports = shortRouter;
