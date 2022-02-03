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
    required: [true, "Please tell us your first name!"],
  },
  userName: {
    type: String,
    required: [true, "Please provide a username!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address!"],
    unique: true,
    validate: [validator.isEmail, " Please provide a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
  badges: {
    type: [badgeSchema],
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model("User", userSchema);

module.exports = User;
