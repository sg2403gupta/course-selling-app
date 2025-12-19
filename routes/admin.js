require("dotenv").config();
const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");

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
