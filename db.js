const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjecId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true, reuired: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const adminSchema = new Schema({
  email: { type: String, unique: true, reuired: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjecId,
});

const purchaseSchema = new Schema({
  userId: ObjecId,
  creatorId: ObjecId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  adminModel,
  userModel,
  purchaseModel,
  courseModel,
};
