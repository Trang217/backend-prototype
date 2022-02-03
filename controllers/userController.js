//--------------------IMPORT MODULE------------------------
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//--------------------IMPORT MODEL------------------------
const User = require("../models/User");

//--------------------IMPORT HELPERS------------------------
const authenticationHelper = require("../helpers/authenticationHelper");
const { tryCatchHelper } = require("../helpers/tryCatchHelper");
const Email = require("../email/email");

//--------------------IMPORT APP ERROR------------------------
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
  ];

  const user = new User();

  user.firstName = firstName;
  user.userName = userName;
  user.email = email;
  user.password = hashedPassword;
  user.badges = defaultBadges;

  await user.save();

  const url = `${req.protocol}://${req.get("host")}`;
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

  //console.log("The user object ", req.user);
  //console.log("The cookies are ", req.cookies);

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

exports.getUserBadges = tryCatchHelper(async (req, res, next) => {
  const userBadges = await User.findById(req.user._id).select("badges");

  if (!userBadges) {
    return next(new AppError("No User exists!", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "user information",
    badges: userBadges.badges,
  });
});

exports.updateBadges = tryCatchHelper(async (req, res, next) => {
  const { score } = req.body;

  const { type } = req.params;

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
    return next(new AppError(("There is no user with email address!", 404)));
  }
  // Generate the random token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  console.log(user);

  console.log(resetURL);

  try {
    // Send it to user 's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({ status: "success", message: "Token sent to email" });
  } catch (error) {
    (user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined);
    await user.save({ validateBeforeSave: false });
    // console.log(error);
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
  // If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Time has expired", 400));
  }

  // hash new password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = await authenticationHelper.generateToken(user);

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({ message: "Login successful", user: { userName: user.userName } });
});
