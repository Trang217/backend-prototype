//--------------------IMPORT MODULES------------------------
const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");

const badgeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: Date.now,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, " Please provide a valid email!"],
  },
  password: {
    type: String,
  },
  badges: {
    type: [badgeSchema],
  },
  totalScore: {type: Number},
  role: {type: String, enum: ["player", "admin"]}, // not yet assigned
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

const User = model("User", userSchema);

module.exports = User;
