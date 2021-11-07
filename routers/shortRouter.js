const express = require("express");
const shortRouter = express.Router();
const fs = require("fs");
const path = require("path");
const homeUrl = "https://cryptic-bastion-17430.herokuapp.com";
const mainPath = __dirname.split("routers")[0];
let json = require(`${mainPath}\\public\\db.json`);

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function getRandomNumber() {
  // Returns random numbers and letters in length of 8
  let random_string =
    Math.random().toString(32).substring(2, 6) +
    Math.random().toString(32).substring(2, 6);
  return random_string;
}

function updateDataBase(json) {
  fs.writeFile(`${mainPath}\\public\\db.json`, JSON.stringify(json), (err) => {
    if (err) {
      res.send(err);
    }
  });
}

shortRouter.post("/api/shorturl/new", (req, res) => {
  // Handle short url post request
  const newPath = getRandomNumber();
  const username = req.headers.username;
  let urlInfo = {
    newUrl: `${homeUrl}/${newPath}`,
    urlClicked: 0,
    dateCreated: new Date(Date.now()).toUTCString(),
  };

  if (json[username]) json[username][req.body.url] = urlInfo;
  else {
    json[username] = {};
    json[username][req.body.url] = urlInfo;
  }

  updateDataBase(json);

  res.send(`${homeUrl}/${newPath}`);
});

shortRouter.get("/:newUrl", (req, res) => {
  let newUrl = `${homeUrl}/${req.params.newUrl}`;
  let usernames = Object.keys(json);
  let objectsUrl = [];
  usernames.forEach((element) => {
    objectsUrl.push(json[element]);
  });

  let keys = [];
  objectsUrl.forEach((element) => {
    keys.push(Object.keys(element));
  });
  let newKeys = [];
  for (let i = 0; i < keys.length; i++) {
    keys[i].forEach((element) => {
      newKeys.push(element);
    });
  }

  for (let i = 0; i < objectsUrl.length; i++) {
    for (let a = 0; a < newKeys.length; a++) {
      if (objectsUrl[i][newKeys[a]]) {
        if (objectsUrl[i][newKeys[a]].newUrl === newUrl)
          json[getKeyByValue(json, objectsUrl[i])][newKeys[a]].urlClicked += 1;
        updateDataBase(json);
        res.redirect(newKeys[a]);
      }
    }
  }
});

shortRouter.get("/api/statistic/:shorturl", (req, res) => {
  const username = req.headers.username;
  let usernameData = json[username];
  if (!usernameData) throw Error("NO SUCH USERNAME");
  let keys = [];
  keys = Object.keys(usernameData);

  let data = {};
  let shortUrl = "";
  for (let i = 0; i < keys.length; i++) {
    if (usernameData[keys[i]]) {
      shortUrl = usernameData[keys[i]].newUrl;
      shortUrl = shortUrl.split(homeUrl)[1];
      shortUrl = shortUrl.substring(1);
      if (shortUrl === req.params.shorturl) {
        data[keys[i]] = usernameData[keys[i]];
        res.send(data);
      }
    }
  }
});

module.exports = shortRouter;
