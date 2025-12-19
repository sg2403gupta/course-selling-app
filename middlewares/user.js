require("dotenv").config();
const jwt = require("jsonwebtoken");
const USER_JWT_SECRET = process.env.JWT_USER_PASSWORD;

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodeUser = jwt.verify(token, USER_JWT_SECRET);

  if (decodeUser) {
    req.userId = decodeUser.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in yet",
    });
  }
}

module.exports({
  userMiddleware: userMiddleware,
});
