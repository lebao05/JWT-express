const express = require("express");
const routerAPI = express.Router();
const {
  register,
  login,
  getUser,
  getUserByAccess_Tken,
} = require("../controllers/userController");
routerAPI.get("/test", (req, res) => {
  return res.status(200).json({ message: "Success!" });
});

routerAPI.post("/register", register);
routerAPI.post("/login", login);

routerAPI.get("/test", (req, res) => {
  return res.status(200).json({ message: "hello" });
});

routerAPI.get("/getAllUsers", getUser);

routerAPI.get("/getUser", getUserByAccess_Tken);
module.exports = routerAPI;
