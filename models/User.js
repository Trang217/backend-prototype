const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your first name!"],
  },
  lastName: {
    type: String,
    required: [true, "Please tell us your last name!"],
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
    minlength: 8,
  },
});

const User = model("User", userSchema);

module.exports = User;
