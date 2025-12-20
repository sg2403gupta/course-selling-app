require("dotenv").config();

const jwt = require("jsonwebtoken");
const ADMIN_JWT_SECRET = process.env.JWT_ADMIN_PASSWORD;

function adminMiddleware(req, res, next) {
  const token = req.headers.token;

  const decodedAdmin = jwt.verify(token, ADMIN_JWT_SECRET);

  if (decodedAdmin) {
    req.userId = decodedAdmin.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in yet",
    });
  }
}

module.exports = {
  adminMiddleware,
};
