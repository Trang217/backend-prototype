exports.errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error happened!";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
