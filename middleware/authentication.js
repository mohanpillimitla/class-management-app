const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(400).send("Not Authenticated");
  }
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.admin = decoded.admin;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};
