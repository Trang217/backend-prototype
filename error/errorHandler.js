module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV == "production") {
    // Duplication error

    if (err.code === 11000) {
      err.statusCode = 400;
      for (let p in err.keyValue) {
        err.message = `${p} must be unique`;
      }
    }

    // ObjectID not found

    if (err.kind === "ObjectId") {
      err.statusCode = 404;
      err.message = `The ${req.originalUrl} is not found because of wrong ID`;
    }

    // Validation

    if (err.errors) {
      err.statusCode = 400;
      err.message = [];

      for (let p in err.errors) {
        err.message.push(err.errors[p].properties.message);
      }
    }

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};
