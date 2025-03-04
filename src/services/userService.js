require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const registerService = async (name, email, password) => {
  const exist = await User.exists({ email: email });
  if (exist)
    return {
      EM: "email existed",
      ER: 2,
    };
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    let result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return { result, ER: 0 };
  } catch (error) {
    console.log(error, "worl232d");
    console.log(error, "worl232d");
    return {
      EM: "error",
      ER: 1,
    };
  }
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        message: "notcorrect!",
        ER: 0,
      };
    }
    const correct = await bcrypt.compare(password, user.password);
    if (correct) {
      const payload = {
        email: user.email,
        username: user.name,
      };
      const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      return {
        message: "success",
        user: {
          username: user.name,
          email: user.email,
          access_token,
        },
        ER: 0,
      };
    }
    return { message: "notcorrect!", ER: 0 };
  } catch (err) {
    return { EM: "error", ER: 1 };
  }
};

const getUsersService = async () => {
  try {
    const users = await User.find().select("-password -__v");
    if (users) {
      return {
        ER: 0,
        users: users,
      };
    }
    return {
      ER: 1,
      ER: "Retrieving failed",
    };
  } catch (error) {
    return {
      EM: error,
      ER: 1,
    };
  }
};

module.exports = {
  registerService,
  loginService,
  getUsersService,
};
