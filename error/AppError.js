class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // set the message property to incoming message

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail!" : "Error happened!";
  }
}

module.exports = AppError;
