const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "Course list",
  });
});

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "My course list",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
