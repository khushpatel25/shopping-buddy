const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false }, // Optional
  lastName: { type: String, required: false }, // Optional
  height: { type: Number, required: false }, // Optional
  weight: { type: Number, required: false }, // Optional
  gender: { type: String, required: false }, // Optional
  age: { type: Number, required: false }, // Optional
  shoppingDays: { type: Number, required: false }, // Optional
  firstTimeLogin: { type: Boolean, default: true }, // New field, initially true
  coins: { type: Number, default: false },
});

module.exports = mongoose.model("User", UserSchema);
