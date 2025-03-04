const {
  registerService,
  loginService,
  getUsersService,
} = require("../services/userService");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const response = await registerService(name, email, password);
  return res.status(200).json(response);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await loginService(email, password);
  return res.status(200).json(response);
};

const getUser = async (req, res) => {
  const responce = await getUsersService();
  return res.status(200).json(responce);
};

const getUserByAccess_Tken = async (req, res) => {
  return res.status(200).json(req.user);
};
module.exports = { register, login, getUser, getUserByAccess_Tken };
