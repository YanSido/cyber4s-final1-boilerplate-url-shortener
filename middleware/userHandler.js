const fs = require("fs");
const path = require("path");
const mainPath = __dirname.split("middleware")[0];
let json = require(`${mainPath}\\public\\db.json`);

function userHandler(req, res, next) {
  // Checks if the url provided exists in the username.
  const username = req.headers.username;
  const url = req.body.url;
  if (json[username]) {
    if (json[username][url]) {
      console.log("already has this URL shorted");
      res.send("already has this URL shorted");
    } else next();
  } else next();
}

module.exports = userHandler;
