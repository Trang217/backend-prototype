const jwt = require("jsonwebtoken");
const passport = require("passport");
const AppError = require("../error/AppError");

/**
 * Generates the token
 */
exports.generateToken = (user) => {
  const payload = { sub: user._id };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (error, asyncToken) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(asyncToken);
      }
    );
  });
};

exports.authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", function (err, user) {
    if (err) return next(err);
    if (!user) throw new AppError("User is not authenticated!", 401);
    req.user = user;
    next();
  })(req, res, next);
};
