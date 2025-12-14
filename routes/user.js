require("dotenv").config();
const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const USER_JWT_SECRET = process.env.JWT_USER_PASSWORD;

const userRouter = Router();
userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  await userModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  res.json({
    message: "Signed Up succeeded..!!",
  });
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        user: user._id,
      },
      USER_JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid credentials..",
    });
  }
});

userRouter.get("/myCourses", function (req, res) {
  res.json({
    message: "Purchased list",
  });
});

module.exports = {
  userRouter: userRouter,
};
