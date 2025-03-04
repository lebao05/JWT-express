const jwt = require("jsonwebtoken");
require("dotenv").config();
const getAccess_token = (req, res, next) => {
  const ctn = ["/", "/api/v1/register", "/api/v1/login", "/api/v1/test"];
  if (ctn.includes(req.path)) return next();
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { username: data.username, email: data.email };
      console.log(data);
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        message: "unauthorized",
      });
    }
  } else
    return res.status(401).json({
      message: "unauthorized",
    });
};
const blackList = (req, res, next) => {
  return next();
  console.log("hello");
};
module.exports = { getAccess_token, blackList };
