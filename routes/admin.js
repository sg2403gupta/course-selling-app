require("dotenv").config();
const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/admin");

const ADMIN_JWT_SECRET = process.env.JWT_ADMIN_PASSWORD;

adminRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;

    //Checks if any of field is missing
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "All field required",
      });
    }

    //Checks existing user

    const existingAdmin = await adminModel.findOne({
      email,
    });

    if (existingAdmin) {
      return res.json({
        message: "User already existed",
      });
    }

    //Creates a new user
    await adminModel.create({
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
adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        user: admin._id,
      },
      ADMIN_JWT_SECRET
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

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, price, imageUrl } = req.body;

  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });
  res.json({
    message: "course created...",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, price, imageUrl, courseId } = req.body;

  const course = await courseModel.findOneAndUpdate(
    {
      _id: courseId,
      creatorId: adminId,
    },
    { title, description, price, imageUrl },
    { new: true }
  );

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }
  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });
  res.json({
    courses,
  });
});

module.exports = {
  adminRouter,
};
