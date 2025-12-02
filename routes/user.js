const { Router } = require("express");

const userRouter = Router();
userRouter.post("/signup", function (req, res) {
  res.json({
    message: "Signed Up!!",
  });
});

userRouter.post("/login", function (req, res) {
  res.json({
    message: "You are signin!!",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchased list",
  });
});

module.exports = {
  userRouter: userRouter,
};
