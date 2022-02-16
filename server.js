//--------------------IMPORT MODULES------------------------

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const configureJwtStrategy = require("./passport-config");

const AppError = require("./error/AppError");
const errorHandler = require("./error/errorHandler");

const userRoutes = require("./routes/userRoutes");
const contentRoutes = require("./routes/contentRoutes");

//--------------------CONFIGURATION SETUP--------------------

dotenv.config();
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;
const app = express();
app.disable("x-powered-by");

app.set("port", PORT || 5000);

//-----------------------MIDDLEWARE---------------------------

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
configureJwtStrategy(passport);

//-----------------------CONNECT DATABASE----------------------

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("We are connected successfully to the database!!!");
  })
  .catch((error) => {
    console.log("An error occurred! Failed to connect to database!!!", error);
  });

//-----------------------ROUTES----------------------

app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);

// Handling unhandled routes

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

//-----------------------APP----------------------

app.listen(app.get("port"), () => {
  console.log("Server is running on port " + app.get("port"));
});
