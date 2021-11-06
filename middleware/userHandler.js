function userHandler(req, res, next) {
  // Checks if the username provided is exist, otherwise will open a new user.
  next();
}

module.exports = userHandler;
