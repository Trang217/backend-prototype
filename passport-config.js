const User = require("./models/User");
const AppError = require("./error/AppError");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;

function configureJwtStrategy(passport) {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: (req, res) => {
          return req.cookies["jwt"];
        },
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, done) => {
        return User.findById(jwtPayload.sub)
          .select("_id firstName lastName userName email")
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
}

module.exports = configureJwtStrategy;
