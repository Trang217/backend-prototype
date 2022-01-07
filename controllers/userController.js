const bcrypt = require("bcrypt");
const User = require("../models/User");
const AppError = require("../error/AppError");
const authenticationHelper = require("../helpers/authenticationHelper");
const { tryCatchHelper } = require("../helpers/tryCatchHelper");

exports.registerUser = tryCatchHelper(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.userName = req.body.userName;
  user.email = req.body.email;
  user.password = hashedPassword;

  await user.save();

  return res.status(200).json({
    status: "Success!",
    message: "User is created successfully",
  });
});

exports.login = tryCatchHelper(async (req, res, next) => {
  // check if the user exists with that email

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("User with that email was not found!", 404));
  }

  // check password

  const checkPassword = await bcrypt.compare(req.body.password, user.password);

  if (!checkPassword) {
    return next(new AppError("Incorrect password!", 401));
  }

  // Generate JWT token

  const token = await authenticationHelper.generateToken(user);

  // send httpOnly

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({ message: "Login successful" });
});

exports.logout = tryCatchHelper(async (req, res, next) => {
  //remove the httpOnly cookie

  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({ message: "Logout successfully!" });
});

exports.listUsers = tryCatchHelper(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  console.log("The user object ", req.user);
  console.log("The cookies are ", req.cookies);

  const skipRows = (page - 1) * pageSize;

  const users = await User.find().skip(skipRows).limit(pageSize);

  return res
    .status(200)
    .json({ status: "success", message: "list of users", users });
});

exports.profile = tryCatchHelper(async (req, res, next) => {
  const user = await User.findById(req.user._id).select(
    "firstName lastName userName email"
  );

  if (!user) {
    return next(new AppError("No User exists!", 404));
  }

  return res
    .status(200)
    .json({ status: "success", message: "user information", user });
});
