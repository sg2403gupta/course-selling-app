const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "Admin signs up!!!",
  });
});
adminRouter.post("/login", function (req, res) {
  res.json({
    message: "Admin logs in",
  });
});

adminRouter.put("/", function (req, res) {
  res.json({
    message: "Admin created courses",
  });
});

adminRouter.get("/bulk", function (req, res) {
  res.json({
    message: "Course lise",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
