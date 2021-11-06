const express = require("express");
const shortRouter = express.Router();
const fs = require("fs");
const path = require("path");
const homeUrl = "http://localhost:3000";
const mainPath =
  "C:/Cyber4s/urlShortner/cyber4s-final1-boilerplate-url-shortener";
let json = require(`${mainPath}/db.json`);

function getRandomNumber() {
  // Returns random numbers and letters in length of 8
  let random_string =
    Math.random().toString(32).substring(2, 6) +
    Math.random().toString(32).substring(2, 6);
  return random_string;
}

function updateDataBase(json) {
  fs.writeFile(`${mainPath}/db.json`, JSON.stringify(json), (err) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Successfully wrote file");
      let json = require(`${mainPath}/db.json`);
      console.log("after", json);
    }
  });
}

shortRouter.post("/api/shorturl/new", (req, res) => {
  // Handle short url post request
  const newPath = getRandomNumber();
  const username = req.headers.username;
  let urlInfo = {
    newUrl: newPath,
    urlClicked: 0,
    dateCreated: new Date(Date.now()).toUTCString(),
  };
  console.log("before", json);
  console.log(req.body.url, `=`, `${homeUrl}/${newPath}`);

  if (json[username]) json[username][req.body.url] = urlInfo;
  else {
    json[username] = {};
    json[username][req.body.url] = urlInfo;
  }

  updateDataBase(json);

  res.send(req.body.url);
});

module.exports = shortRouter;
