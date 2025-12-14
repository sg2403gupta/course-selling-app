const { Router } = require("express");
const { userModel } = require("../db");

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
    message: "Signed Up!!",
  });
});

userRouter.post("/login", function (req, res) {
  res.json({
    message: "You are signin!!",
  });
});

userRouter.get("/myCourses", function (req, res) {
  res.json({
    message: "Purchased list",
  });
});

module.exports = {
  userRouter: userRouter,
};
