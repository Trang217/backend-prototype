//--------------------IMPORT MODULES------------------------
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//--------------------IMPORT MODEL--------------------------
const User = require("../models/User");

//--------------------IMPORT HELPERS------------------------
const authenticationHelper = require("../helpers/authenticationHelper");
const { tryCatchHelper } = require("../helpers/tryCatchHelper");
const Email = require("../email/email");
//const { getScore } = require("../helpers/calcScoreHelper");

//--------------------IMPORT APP ERROR----------------------
const AppError = require("../error/AppError");

exports.registerUser = tryCatchHelper(async (req, res, next) => {
  const { firstName, userName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const defaultBadges = [
    {
      type: "desert",
      score: 0,
      date: Date.now(),
    },
    {
      type: "rainforest",
      score: 0,
      date: Date.now(),
    },
    {
      type: "ocean",
      score: 0,
      date: Date.now(),
    },
  ];

  const user = new User();

  user.firstName = firstName;
  user.userName = userName;
  user.email = email;
  user.password = hashedPassword;
  user.badges = defaultBadges;
  user.totalScore = 0;

  await user.save();

  const url = `${req.protocol}://localhost:3000`;

  await new Email(user, url).sendWelcome();

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
    .json({ message: "Login successful", user: { userName: user.userName } });
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

  const skipRows = (page - 1) * pageSize;

  const users = await User.find().skip(skipRows).limit(pageSize);

  return res
    .status(200)
    .json({ status: "success", message: "list of users", users });
});

exports.profile = tryCatchHelper(async (req, res, next) => {
  const user = await User.findById(req.user._id).select(
    "firstName userName email badges"
  );

  if (!user) {
    return next(new AppError("No User exists!", 404));
  }

  return res
    .status(200)
    .json({ status: "success", message: "user information", user });
});

//badges

exports.getUserBadges = tryCatchHelper(async (req, res, next) => {
  const userInfo = await User.findById(req.user._id).select("firstName badges");

  if (!userInfo) {
    return next(new AppError("No User exists!", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "user information",
    badges: userInfo.badges,
    firstName: userInfo.firstName,
  });
});

exports.updateBadges = tryCatchHelper(async (req, res, next) => {
  const { score } = req.body;

  const { type } = req.body;

  const updatedUserBadges = await User.findOneAndUpdate(
    {
      _id: req.user._id,
      "badges.type": type,
    },
    {
      $set: {
        "badges.$[element].score": score,
        "badges.$[element].date": Date.now(),
      },
      $inc: {
        totalScore: score,
      },
    },
    {
      arrayFilters: [
        { "element.score": { $lte: score }, "element.type": { $eq: type } },
      ],
      new: true,
    }
  ).select("badges");

  return res.status(200).json({
    message: "User badge is updated",
    updateBadges: updatedUserBadges,
  });
});

exports.forgotPassword = tryCatchHelper(async (req, res, next) => {
  // Get user based on posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError("Please make sure your email correct and try again!")
    );
  }
  // Generate the random token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // Send it to user 's email
    const resetURL = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message:
        "Check your mailbox! A link to reset your password should be there in a few!",
    });
  } catch (error) {
    (user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined);
    await user.save({ validateBeforeSave: false });
    console.log(error);
    return next(new AppError("Error with sending email, try later", 500));
  }
});

exports.resetPassword = tryCatchHelper(async (req, res, next) => {
  // get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Time has expired! Please try again later!", 400));
  }

  // hash new password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return res.status(200).json({
    message: "New password is successfully set!",
  });
});

// Update user account

exports.updateAccountDetail = tryCatchHelper(async (req, res, next) => {
  const update = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, update, {
    new: true,
  });

  if (!user) {
    return next(new AppError("No User exists!", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Your account detail is successfully updated!",
  });
});

exports.updateFirstName = tryCatchHelper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { firstName: req.body.firstName },
    { new: true }
  );

  if (!user) {
    return next(new AppError("No User exists!", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Your first name is successfully updated!",
  });
});

exports.updateUsername = tryCatchHelper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { userName: req.body.userName },
    { new: true }
  );

  if (!user) {
    return next(new AppError("No User exists!", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Your username is successfully updated!",
  });
});

exports.updateEmail = tryCatchHelper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { email: req.body.email },
    { new: true }
  );

  if (!user) {
    return next(new AppError("No User exists!", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Your email is successfully updated!",
  });
});

exports.updatePassword = tryCatchHelper(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("No User exists!", 404));
  }

  // check password
  const checkPassword = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (!checkPassword) {
    return next(new AppError("Your current password is wrong!", 401));
  }

  // update password
  const newHashedPassword = await bcrypt.hash(req.body.newPassword, 12);
  user.password = newHashedPassword;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Your new password is successfully updated!",
  });
});

exports.deleteUser = tryCatchHelper(async (req, res, next) => {
  const deleteUser = {
    active: false,
    email: "delete@delete.com",
    userName: "delete",
  };
  const user = await User.findByIdAndUpdate(req.user._id, deleteUser, {
    new: true,
  });

  if (!user) {
    return next(new AppError("No User exists!", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Your account is deleted!",
  });
});

exports.getUsers = tryCatchHelper(async (req, res, next) => {
  const users = await User.find()
    .select("userName totalScore")
    .sort({ totalScore: -1 })
    .limit(Number(req.query["limit"]) || 5)
    .skip(Number(req.query["skip"]) || 0)
    .lean();

  if (!users) {
    return next(new AppError("No Users exists!", 404));
  }
  return res.status(200).json({
    users,
  });
});
