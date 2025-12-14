const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

app.use("/app/v1/user", userRouter);
app.use("/app/v1/admin", adminRouter);
app.use("/app/v1/course", courseRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://shubhamgupta0324_db_user:TKLEyqE3Top6FC26@cluster0.5qiweld.mongodb.net/course-selling-app"
  );
  console.log("Database ir running..");
  app.listen(3000);
}
main();
