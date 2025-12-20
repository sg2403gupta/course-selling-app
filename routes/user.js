require("dotenv").config();
const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const USER_JWT_SECRET = process.env.JWT_USER_PASSWORD;

const userRouter = Router();
userRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;

    //Checks if any of field is missing
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "All field required",
      });
    }

    //Checks existing user

    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.json({
        message: "User already existed",
      });
    }

    //Creates a new user
    await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    res.json({
      message: "Signed Up succeeded..!!",
    });
  } catch (e) {
    res.json({
      message: "Signup failed",
    });
  }
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

userRouter.get("/myCourses", async function (req, res) {
  const userId = req.body;

  const myCourses = await purchaseModel.find({
    userId,
  });

  const courseData = await courseModel.find({
    _id: { $in: myCourses.map((x) => x.courseId) },
  });

  res.json({
    myCourses,
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};
